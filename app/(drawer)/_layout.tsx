import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";

import { Text, View } from "react-native";

import Header from "@/src/components/Header";
import { useTheme } from "@/src/hooks/useTheme";

export default function DrawerLayout() {
  const { colors } = useTheme();

  return (
    <Drawer
      drawerContent={(props) => (
        <View style={{ flex: 1 }}>
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>

          <View
            style={{
              padding: 20,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              marginBottom: 4,
            }}
          >
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              Pé na Rua 🌳 • v1.0.0
            </Text>
          </View>
        </View>
      )}
      screenOptions={{
        headerShown: false,

        drawerStyle: {
          backgroundColor: colors.surface,
          width: 280,
        },

        sceneStyle: {
          backgroundColor: colors.background,
        },

        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,

        drawerActiveBackgroundColor: `${colors.primary}15`,

        drawerItemStyle: {
          borderRadius: 12,
          marginHorizontal: 6,
        },

        drawerLabelStyle: {
          color: colors.text,
          fontSize: 15,
          fontWeight: "600",
        },
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          headerShown: true,
          header: () => <Header title="Configurações ⚙️" />,
          drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="about"
        options={{
          headerShown: true,
          header: () => <Header title="Sobre ℹ️" />,
          drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer>
  );
}
