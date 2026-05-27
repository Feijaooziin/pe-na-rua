import { useSettings } from "@/src/hooks/useSettings";
import {
  arborDay,
  arborDeepForest,
  arborForest,
  arborNight,
} from "@/src/theme/themes";

export type ThemeName =
  | "arborDay"
  | "arborNight"
  | "arborForest"
  | "arborDeepForest";

const themes: Record<ThemeName, any> = {
  arborDay,
  arborNight,
  arborForest,
  arborDeepForest,
};

export function useTheme() {
  const { settings } = useSettings();

  const fallback: ThemeName = "arborDay";

  const themeName =
    (settings?.theme as ThemeName) && themes[settings?.theme as ThemeName]
      ? (settings?.theme as ThemeName)
      : fallback;

  const colors = themes[themeName] ?? themes.arborDay;

  const isDark = themeName === "arborNight" || themeName === "arborDeepForest";

  return {
    colors,
    isDark,
    currentTheme: themeName,
    settings,
  };
}
