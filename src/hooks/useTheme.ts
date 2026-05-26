// import { useFocusEffect } from "@react-navigation/native";
// import { useCallback } from "react";

// import { useSettings } from "@/src/hooks/useSettings";
// import { darkTheme, lightTheme } from "@/src/theme/themes";

// export function useTheme() {
//   const { settings, loadSettings } = useSettings();

//   const colors = settings?.theme === "dark" ? darkTheme : lightTheme;

//   const isDark = settings?.theme === "dark";

//   useFocusEffect(
//     useCallback(() => {
//       loadSettings();
//     }, []),
//   );

//   return {
//     colors,
//     isDark,
//     settings,
//   };
// }

import { useSettings } from "@/src/hooks/useSettings";

import { darkTheme, lightTheme } from "@/src/theme/themes";

export function useTheme() {
  const { settings } = useSettings();

  const colors = settings?.theme === "dark" ? darkTheme : lightTheme;

  const isDark = settings?.theme === "dark";

  return {
    colors,
    isDark,
    settings,
  };
}
