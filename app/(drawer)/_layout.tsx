import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen name="home" options={{ title: "Início 🌱" }} />
      <Drawer.Screen name="settings" options={{ title: "Configurações ⚙️" }} />
    </Drawer>
  );
}
