import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import Header from "@/src/components/Header";
import { getTrees } from "@/src/database/trees";
import { Tree } from "@/src/types/tree";

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [trees, setTrees] = useState<Tree[]>([]);

  // 📍 pegar localização
  useEffect(() => {
    (async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (!granted) {
        alert("Permissão de localização negada");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  // 🌳 pegar árvores do banco
  useFocusEffect(
    useCallback(() => {
      const data = getTrees();
      setTrees(data);
    }, []),
  );

  if (!location) {
    return <Text>Carregando mapa...</Text>;
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
        {/* 📍 Local atual */}
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
