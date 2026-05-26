import { useSettings } from "@/src/hooks/useSettings";
import { darkTheme, lightTheme } from "@/src/theme/themes";

export function useTheme() {
  const { settings } = useSettings();

  const colors = settings?.theme === "dark" ? darkTheme : lightTheme;
  const isDark = settings?.theme === "dark";

  return {
    colors,
    isDark,
  };
}
