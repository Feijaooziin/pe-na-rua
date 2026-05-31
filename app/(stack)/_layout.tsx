import { Stack } from "expo-router";

import Header from "@/src/components/Header";
import { useTheme } from "@/src/hooks/useTheme";

export default function StackLayout() {
  const { colors, isDark } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
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
      <Stack.Screen
        name="settings/share-text"
        options={{
          title: "Editar texto",
          header: () => <Header title="Editar texto" backHeader />,
        }}
      />
    </Stack>
  );
}
