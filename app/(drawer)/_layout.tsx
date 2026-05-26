import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

import { useTheme } from "@/src/hooks/useTheme";

export default function DrawerLayout() {
  const { colors, isDark } = useTheme();

  return (
    <Drawer
      screenOptions={{
        headerShown: false,

        drawerStyle: {
          backgroundColor: colors.surface,
        },

        sceneStyle: {
          backgroundColor: colors.background,
        },

        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,

        drawerLabelStyle: {
          color: colors.text,
        },
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: "Início",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          title: "Configurações",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="dev/playground"
        options={{
          title: "UI Playground",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="flask-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
