import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import Header from "@/src/components/Header";
import { getTrees } from "@/src/database/trees";
import { Tree } from "@/src/types/tree";
import { router } from "expo-router";

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [trees, setTrees] = useState<Tree[]>([]);
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);

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

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
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
        {trees.map((tree) => {
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
          {selectedTree.image ? (
            <Image
              source={{ uri: selectedTree.image }}
              style={{
                width: "100%",
                height: 150,
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
                flex: 1,
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
              onPress={() => setSelectedTree(null)}
              style={{
                padding: 12,
                borderRadius: 10,
                backgroundColor: "#eee",
              }}
            >
              <Text>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
