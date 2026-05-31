import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import MapView, { Marker } from "react-native-maps";

import { getTrees } from "@/src/database/trees";

import { useSettings } from "@/src/hooks/useSettings";
import { useTheme } from "@/src/hooks/useTheme";

import { shareTree } from "@/src/services/shareTree";

import { Tree } from "@/src/types/tree";

import {
  getCategoryColor,
  getCategoryLabel,
  getCategoryMarker,
} from "@/src/utils/category";

export default function Map() {
  const { colors, isDark } = useTheme();

  const { settings, loading, loadSettings } = useSettings();

  const mapRef = useRef<MapView>(null);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  const [trees, setTrees] = useState<Tree[]>([]);

  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);

  const images = (() => {
    if (!selectedTree?.images) return [];

    if (Array.isArray(selectedTree.images)) {
      return selectedTree.images;
    }

    try {
      const parsed = JSON.parse(selectedTree.images as any);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  const firstImage = images.length > 0 ? images[0] : null;

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, []),
  );

  // 📍 AUTO CENTRALIZAR
  useEffect(() => {
    if (settings?.autoCenter && location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [settings?.autoCenter, location]);

  // 📍 LOCALIZAÇÃO
  useEffect(() => {
    (async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (!granted) {
        alert("Permissão negada");

        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(loc);
    })();
  }, []);

  // 🌳 CARREGAR ÁRVORES
  useFocusEffect(
    useCallback(() => {
      const data = getTrees();

      setTrees(data);
    }, []),
  );

  // 🔄 ATUALIZA CARD
  useEffect(() => {
    if (!selectedTree) return;

    const updatedTree = trees.find((t) => t.id === selectedTree.id);

    if (updatedTree) {
      setSelectedTree(updatedTree);
    } else {
      setSelectedTree(null);
    }
  }, [trees]);

  // ⏳ LOADING LOCALIZAÇÃO
  if (!location) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <MapView
          style={{
            flex: 1,
          }}
          initialRegion={{
            latitude: -25.429,
            longitude: -49.271,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        />

        <View
          style={{
            position: "absolute",

            top: 120,

            alignSelf: "center",

            backgroundColor: colors.surface,

            paddingHorizontal: 16,
            paddingVertical: 10,

            borderRadius: 14,

            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontWeight: "600",
            }}
          >
            Obtendo localização...
          </Text>
        </View>
      </View>
    );
  }

  // ⏳ LOADING SETTINGS
  if (loading || !settings) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <View
          style={{
            flex: 1,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.text,
            }}
          >
            Carregando...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <MapView
        key={`${settings.mapType}-${isDark}`}
        ref={mapRef}
        mapType={settings.mapType}
        style={{
          flex: 1,
        }}
        initialRegion={
          settings.autoCenter && location
            ? {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : {
                latitude: -25.5,
                longitude: -49.2,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
              }
        }
        userInterfaceStyle={isDark ? "dark" : "light"}
      >
        {/* 📍 VOCÊ */}
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Você está aqui"
        />

        {/* 🌳 ÁRVORES */}
        {settings.showTrees &&
          trees.map((tree) => {
            if (!tree.latitude || !tree.longitude) {
              return null;
            }

            return (
              <Marker
                key={tree.id}
                coordinate={{
                  latitude: tree.latitude,
                  longitude: tree.longitude,
                }}
                onPress={() => setSelectedTree(tree)}
                tracksViewChanges={false}
              >
                <Image
                  source={getCategoryMarker(tree?.category)}
                  style={
                    tree === selectedTree
                      ? {
                          width: 65,
                          height: 65,
                        }
                      : {
                          width: 50,
                          height: 50,
                        }
                  }
                  resizeMode="cover"
                />
              </Marker>
            );
          })}
      </MapView>

      {/* 🌳 ÁRVORES OCULTAS */}
      {!settings.showTrees && (
        <View
          style={{
            position: "absolute",

            top: 120,

            alignSelf: "center",

            backgroundColor: colors.surface,

            paddingHorizontal: 14,
            paddingVertical: 10,

            borderRadius: 14,

            borderWidth: 1,
            borderColor: colors.border,

            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 8,
            shadowOffset: {
              width: 0,
              height: 2,
            },

            elevation: 5,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontWeight: "600",
            }}
          >
            Árvores ocultas 🌳
          </Text>
        </View>
      )}

      {/* 🌳 CARD */}
      {selectedTree && (
        <View
          style={{
            position: "absolute",

            bottom: 96,

            left: 14,
            right: 14,

            backgroundColor: colors.surface,

            borderRadius: 24,

            padding: 16,

            borderWidth: 1,
            borderColor: colors.border,

            shadowColor: "#000",
            shadowOpacity: 0.12,
            shadowRadius: 12,
            shadowOffset: {
              width: 0,
              height: 4,
            },

            elevation: 12,
          }}
        >
          {/* 📸 IMAGEM */}
          {firstImage ? (
            <Image
              source={{ uri: firstImage }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 180,

                borderRadius: 18,

                marginBottom: 12,
              }}
            />
          ) : (
            <View
              style={{
                height: 160,

                backgroundColor: colors.background,

                borderRadius: 18,

                justifyContent: "center",
                alignItems: "center",

                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: colors.textMuted,
                }}
              >
                Sem imagem
              </Text>
            </View>
          )}

          {/* 🌳 NOME */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",

              color: colors.text,

              marginBottom: 8,
            }}
          >
            {selectedTree.name}
          </Text>

          {/* 🏷️ CATEGORIA */}
          <View
            style={{
              alignSelf: "flex-start",

              backgroundColor: getCategoryColor(selectedTree.category),

              paddingHorizontal: 12,
              paddingVertical: 6,

              borderRadius: 999,

              marginBottom: 16,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              {getCategoryLabel(selectedTree.category)}
            </Text>
          </View>

          {/* 📍 BOTÕES */}
          <View
            style={{
              flexDirection: "row",
              gap: 10,
            }}
          >
            {/* DETALHES */}
            <TouchableOpacity
              onPress={() =>
                router.push(`/home/details/${selectedTree.id}` as any)
              }
              style={{
                flex: 5,

                backgroundColor: colors.primary,

                paddingVertical: 14,

                borderRadius: 14,

                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Ver detalhes
              </Text>
            </TouchableOpacity>

            {/* SHARE */}
            <TouchableOpacity
              onPress={() => shareTree(selectedTree, settings)}
              style={{
                flex: 3,

                backgroundColor: colors.secondary,

                paddingVertical: 14,

                borderRadius: 14,

                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Compartilhar
              </Text>
            </TouchableOpacity>

            {/* FECHAR */}
            <TouchableOpacity
              onPress={() => setSelectedTree(null)}
              style={{
                backgroundColor: colors.danger,

                paddingHorizontal: 14,
                paddingVertical: 14,

                borderRadius: 14,

                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                ✕
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
