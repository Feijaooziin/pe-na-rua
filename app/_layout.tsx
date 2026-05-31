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
    NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark");
  }, [isDark]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
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
        await initDB();
      } finally {
        setReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
