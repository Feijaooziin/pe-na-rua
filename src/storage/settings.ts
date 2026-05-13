import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@settings";

export type Settings = {
  autoCenter: boolean;
  showTrees: boolean;
  mapType: "standard" | "satellite" | "hybrid" | "terrain";

  maxImages: number;
  autoLocation: boolean;
  shareText: string;
  includeMaps: boolean;
};

const DEFAULT_SETTINGS: Settings = {
  autoCenter: true,
  showTrees: true,
  mapType: "standard",
  maxImages: 10,
  autoLocation: true,
  shareText: "📱 Registrado no app Pé na Rua",
  includeMaps: true,
};

// 👉 pegar configs
export async function getSettings(): Promise<Settings> {
  try {
    const data = await AsyncStorage.getItem(KEY);

    if (!data) return DEFAULT_SETTINGS;

    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch (error) {
    console.log("Erro ao carregar settings", error);
    return DEFAULT_SETTINGS;
  }
}

// 👉 salvar configs
export async function saveSettings(settings: Settings) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(settings));
  } catch (error) {
    console.log("Erro ao salvar settings", error);
  }
}

// 👉 resetar configs
export async function resetSettings() {
  await AsyncStorage.removeItem(KEY);
}
