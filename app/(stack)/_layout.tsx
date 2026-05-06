import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="settings/share-text"
        options={{
          title: "Editar texto",
        }}
      />
    </Stack>
  );
}
