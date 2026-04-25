import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />

      {/* SOMENTE DETAILS COM HEADER */}
      <Stack.Screen
        name="details/[id]"
        options={{
          headerShown: true,
          title: "Detalhes",
        }}
      />

      <Stack.Screen name="edit/[id]" />
      <Stack.Screen name="create" />
    </Stack>
  );
}
