import { getSettings, saveSettings, Settings } from "@/src/storage/settings";
import { useEffect, useState } from "react";

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔄 carregar ao iniciar
  useEffect(() => {
    async function load() {
      const data = await getSettings();
      setSettings(data);
      setLoading(false);
    }

    load();
  }, []);

  // 💾 atualizar 1 ou mais campos
  async function updateSetting(newValues: Partial<Settings>) {
    if (!settings) return;

    const updated = { ...settings, ...newValues };

    setSettings(updated);
    await saveSettings(updated);
  }

  return {
    settings,
    loading,
    updateSetting,
  };
}
