import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import { useCallback, useEffect, useRef, useState } from "react";
import { Image, Share, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import Header from "@/src/components/Header";
import { getTrees } from "@/src/database/trees";
import { useSettings } from "@/src/hooks/useSettings";
import { colors } from "@/src/theme/colors";
import { Tree } from "@/src/types/tree";
import { router } from "expo-router";

export default function Map() {
  const { settings, loading, loadSettings } = useSettings();
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [trees, setTrees] = useState<Tree[]>([]);
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const images = (() => {
    if (!selectedTree?.images) return [];

    if (Array.isArray(selectedTree.images)) return selectedTree.images;

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

  // 📍 localização atual
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

  // 🌳 carregar árvores
  useFocusEffect(
    useCallback(() => {
      const data = getTrees();
      setTrees(data);
    }, []),
  );

  useEffect(() => {
    if (!selectedTree) return;

    const updatedTree = trees.find((t) => t.id === selectedTree.id);

    if (updatedTree) {
      setSelectedTree(updatedTree);
    } else {
      setSelectedTree(null);
    }
  }, [trees]);

  if (!location) {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: -25.429,
            longitude: -49.271,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        />
      </View>
    );
  }

  async function handleShare(tree: Tree) {
    const latitude = tree.latitude;
    const longitude = tree.longitude;
    if (!latitude || !longitude) return;

    const mapsLink =
      latitude && longitude
        ? `https://www.google.com/maps?q=${latitude},${longitude}`
        : "Localização não disponível";

    const message = `🌳 *${tree.name}*

${tree.description || "Sem descrição"}

${settings?.includeMaps ? `📍 Localização:\n${mapsLink}\n` : ""}

📱 Registrado no app Pé na Rua`;

    try {
      await Share.share({
        message,
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (loading || !settings)
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Header />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Carregando...</Text>
        </View>
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <MapView
        key={settings.mapType}
        ref={mapRef}
        mapType={settings.mapType}
        style={{ flex: 1 }}
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
      >
        {/* 📍 Você */}
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Você está aqui"
        />

        {/* 🌳 Árvores */}
        {settings.showTrees &&
          trees.map((tree) => {
            if (!tree.latitude || !tree.longitude) return null;

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
                  source={require("@/assets/images/marker.png")}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  resizeMode="cover"
                />
              </Marker>
            );
          })}
      </MapView>

      {!settings.showTrees && (
        <View
          style={{
            position: "absolute",
            top: 20,
            alignSelf: "center",
            backgroundColor: "#000",
            padding: 8,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff" }}>Árvores ocultas 🌳</Text>
        </View>
      )}

      {selectedTree && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 15,
            elevation: 10,
          }}
        >
          {/* 📸 IMAGEM */}
          {firstImage ? (
            <Image
              source={{ uri: firstImage }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 175,
                borderRadius: 12,
                marginBottom: 10,
              }}
            />
          ) : (
            <View
              style={{
                height: 150,
                backgroundColor: "#ddd",
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text>Sem imagem</Text>
            </View>
          )}

          {/* 🌳 NOME */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            {selectedTree.name}
          </Text>

          {/* 📍 BOTÕES */}
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              onPress={() =>
                router.push(`/home/details/${selectedTree.id}` as any)
              }
              style={{
                flex: 5,
                backgroundColor: "#2e7d32",
                padding: 12,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Ver detalhes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleShare(selectedTree)}
              style={{
                flex: 3,
                backgroundColor: "#1976d2",
                padding: 12,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Compartilhar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedTree(null)}
              style={{
                padding: 12,
                borderRadius: 10,
                backgroundColor: "#c51515",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
