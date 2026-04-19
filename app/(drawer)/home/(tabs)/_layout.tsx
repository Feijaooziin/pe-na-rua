import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="list" options={{ title: "Lista 🌳" }} />
      <Tabs.Screen name="map" options={{ title: "Mapa 🗺️" }} />
    </Tabs>
  );
}
