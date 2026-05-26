// import { useCallback, useEffect, useState, useContext } from "react";
// import { SettingsContext } from "@/src/context/SettingsContext";
// import { getSettings, saveSettings, Settings } from "@/src/storage/settings";

import { SettingsContext } from "@/src/context/SettingsContext";
import { useContext } from "react";

export function useSettings() {
  return useContext(SettingsContext);
}

// export function useSettings() {
//   const [settings, setSettings] = useState<Settings | null>(null);
//   const [loading, setLoading] = useState(true);

//   // 🔄 carregar configs
//   const loadSettings = useCallback(async () => {
//     setLoading(true);

//     const data = await getSettings();

//     setSettings(data);
//     setLoading(false);
//   }, []);

//   // 🚀 carregar ao iniciar
//   useEffect(() => {
//     loadSettings();
//   }, []);

//   // 💾 atualizar configs
//   async function updateSetting(newValues: Partial<Settings>) {
//     if (!settings) return;

//     const updated = { ...settings, ...newValues };

//     setSettings(updated);
//     await saveSettings(updated);
//   }

//   return {
//     settings,
//     loading,
//     updateSetting,
//     loadSettings,
//   };
// }
