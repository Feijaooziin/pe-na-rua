import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="home" options={{ title: "Início" }} />
      <Drawer.Screen name="settings" options={{ title: "Configurações" }} />
    </Drawer>
  );
}
