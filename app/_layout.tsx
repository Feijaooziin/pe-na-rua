import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

import { CustomToast } from "@/src/components/CustomToast";
import { SettingsProvider } from "@/src/context/SettingsContext";
import { initDB } from "@/src/database/db";
import { useTheme } from "@/src/hooks/useTheme";

SplashScreen.preventAutoHideAsync();

const toastConfig = {
  success: (props: any) => <CustomToast {...props} type="success" />,
  error: (props: any) => <CustomToast {...props} type="error" />,
  info: (props: any) => <CustomToast {...props} type="info" />,
};

function AppContent() {
  const { colors, isDark } = useTheme();

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(colors.background);
    NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark");
  }, [colors.background, isDark]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
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
    async function prepare() {
      try {
        await NavigationBar.setBackgroundColorAsync("#FFFFFF");
        await NavigationBar.setButtonStyleAsync("dark");
        await initDB();
      } finally {
        setReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}
      />
    );
  }

  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
