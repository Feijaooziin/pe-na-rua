import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { SettingsProvider } from "@/src/context/SettingsContext";
import { initDB } from "@/src/database/db";
import { useTheme } from "@/src/hooks/useTheme";

function AppContent() {
  const { isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />

      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

export default function Layout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initDB();
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
