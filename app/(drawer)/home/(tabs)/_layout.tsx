import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { useTheme } from "@/src/hooks/useTheme";

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        sceneStyle: {
          backgroundColor: colors.background,
        },

        tabBarStyle: {
          position: "absolute",

          left: 12,
          right: 12,
          bottom: 12,

          borderRadius: 22,

          height: 78,

          backgroundColor: colors.surface,

          borderTopWidth: 0,

          paddingTop: 6,
          paddingBottom: 12,

          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 8,

          shadowOffset: {
            width: 0,
            height: -2,
          },

          elevation: 8,
        },

        tabBarActiveTintColor: colors.primary,

        tabBarInactiveTintColor: colors.textSecondary,

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="list"
        options={{
          title: "Lista",

          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "leaf" : "leaf-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Mapa",

          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
