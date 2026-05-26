import { getSettings, saveSettings, Settings } from "@/src/storage/settings";
import { createContext, ReactNode, useEffect, useState } from "react";

type SettingsContextData = {
  settings: Settings | null;
  loading: boolean;
  updateSetting: (values: Partial<Settings>) => Promise<void>;
  loadSettings: () => Promise<void>;
};

type ProviderProps = {
  children: ReactNode;
};

export const SettingsContext = createContext({} as SettingsContextData);

export function SettingsProvider({ children }: ProviderProps) {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadSettings() {
    try {
      const data = await getSettings();

      setSettings(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateSetting(newValues: Partial<Settings>) {
    if (!settings) return;

    try {
      const updated: Settings = {
        ...settings,
        ...newValues,
      };

      setSettings(updated);

      await saveSettings(updated);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        updateSetting,
        loadSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
