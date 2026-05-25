import { darkTheme, lightTheme } from "./themes";

export function getTheme(mode: "light" | "dark") {
  return mode === "dark" ? darkTheme : lightTheme;
}
