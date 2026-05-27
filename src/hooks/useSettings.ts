import { SettingsContext } from "@/src/context/SettingsContext";
import { useContext } from "react";

export function useSettings() {
  return useContext(SettingsContext);
}
