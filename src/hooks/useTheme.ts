import { useColorScheme } from "react-native";

import { useSettings } from "@/src/hooks/useSettings";
import { darkTheme, lightTheme } from "@/src/theme/themes";

export function useTheme() {
  const { settings } = useSettings();
  const systemTheme = useColorScheme();

  const currentTheme =
    settings?.theme === "system" ? systemTheme : settings?.theme;

  const isDark = currentTheme === "dark";

  const colors = isDark ? darkTheme : lightTheme;

  return {
    colors,
    isDark,
    settings,
    currentTheme,
  };
}
