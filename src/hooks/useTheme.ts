import { darkTheme, lightTheme } from "@/src/theme/themes";
import { useSettings } from "./useSettings";

export function useTheme() {
  const { settings } = useSettings();

  const colors = settings?.theme === "dark" ? darkTheme : lightTheme;

  const isDark = settings?.theme === "dark";

  return {
    colors,
    isDark,
  };
}
