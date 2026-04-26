import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import Header from "@/src/components/Header";
import { getTrees } from "@/src/database/trees";
import { Tree } from "@/src/types/tree";

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [trees, setTrees] = useState<Tree[]>([]);

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
              title={tree.name}
              description={tree.description}
            />
          );
        })}
      </MapView>
    </View>
  );
}
