import { Stack } from "expo-router";

import Header from "@/src/components/Header";
import { useTheme } from "@/src/hooks/useTheme";

export default function HomeLayout() {
  const { colors, isDark } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,

        contentStyle: {
          backgroundColor: colors.background,
        },

        headerStyle: {
          backgroundColor: colors.surface,
        },

        headerTintColor: colors.text,

        headerTitleStyle: {
          color: colors.text,
          fontWeight: "bold",
        },

        headerShadowVisible: false,

        statusBarStyle: isDark ? "light" : "dark",
      }}
    >
      <Stack.Screen name="(tabs)" />

      <Stack.Screen
        name="details/[id]"
        options={{
          headerShown: true,
          header: () => <Header title="Detalhes" backHeader />,
        }}
      />

      <Stack.Screen
        name="edit/[id]"
        options={{
          headerShown: true,
          header: () => <Header title="Editar" backHeader />,
        }}
      />

      <Stack.Screen
        name="create"
        options={{
          headerShown: true,
          header: () => <Header title="Criar" backHeader />,
        }}
      />
    </Stack>
  );
}
