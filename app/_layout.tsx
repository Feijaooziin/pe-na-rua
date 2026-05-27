import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";

import { SettingsProvider } from "@/src/context/SettingsContext";
import { initDB } from "@/src/database/db";
import { useTheme } from "@/src/hooks/useTheme";

import { CustomToast } from "@/src/components/CustomToast";
const toastConfig = {
  success: (props: any) => <CustomToast {...props} type="success" />,
  error: (props: any) => <CustomToast {...props} type="error" />,
  info: (props: any) => <CustomToast {...props} type="info" />,
};

function AppContent() {
  const { colors, isDark } = useTheme();

  useEffect(() => {
    NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark");
  }, [isDark]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      <Stack
        screenOptions={{
          headerShown: false,

          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      />

      <Toast config={toastConfig} />
    </View>
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
