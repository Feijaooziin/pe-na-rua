import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { ReactNode } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Header from "@/src/components/Header";
import { db } from "@/src/database/db";
import { useSettings } from "@/src/hooks/useSettings";
import { exportTrees, importTrees } from "@/src/services/backup";
import { resetSettings } from "@/src/storage/settings";
import { colors } from "@/src/theme/colors";

export default function Settings() {
  const { settings, loading, updateSetting, loadSettings } = useSettings();

  function handleResetSettings() {
    Alert.alert(
      "Resetar configurações",
      "Todas as configurações voltarão ao padrão.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Resetar",
          onPress: async () => {
            try {
              await resetSettings();

              await loadSettings();

              Alert.alert("Sucesso", "Configurações resetadas com sucesso!");
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  }

  function handleClearTrees() {
    Alert.alert(
      "Limpar árvores",
      "Todas as árvores cadastradas serão apagadas.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: async () => {
            try {
              db.runSync("DELETE FROM trees");

              Alert.alert("Sucesso", "Árvores apagadas com sucesso!");

              router.replace("/(drawer)/home/(tabs)/list");
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  }

  function handleResetApp() {
    Alert.alert(
      "Resetar aplicativo",
      "Isso apagará TODAS as árvores e restaurará TODAS as configurações.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Resetar tudo",
          style: "destructive",
          onPress: async () => {
            try {
              db.runSync("DELETE FROM trees");

              await resetSettings();

              await loadSettings();

              Alert.alert("Sucesso", "Aplicativo resetado com sucesso!");

              router.replace("/(drawer)/home/(tabs)/list");
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  }

  type SectionProps = {
    title: string;
    children: ReactNode;
  };

  function Section({ title, children }: SectionProps) {
    return (
      <View style={{ marginBottom: 25 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            marginBottom: 8,
            color: "#666",
          }}
        >
          {title.toUpperCase()}
        </Text>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {children}
        </View>
      </View>
    );
  }

  function DangerSection({ title, children }: SectionProps) {
    return (
      <View style={{ marginBottom: 25 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            marginBottom: 8,
            color: colors.danger,
          }}
        >
          {title.toUpperCase()}
        </Text>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 12,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: colors.danger,
          }}
        >
          {children}
        </View>
      </View>
    );
  }

  type ItemProps = {
    label: string;
    desc?: string;
    onPress: () => void;
  };

  function Item({ label, desc, onPress }: ItemProps) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          padding: 15,
          borderBottomWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text style={{ color: colors.text }}>{label}</Text>

        {desc && (
          <Text
            style={{
              fontSize: 12,
              color: "#888",
              marginTop: 4,
            }}
          >
            {desc}
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  function DangerItem({ label, desc, onPress }: ItemProps) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          padding: 15,
          borderBottomWidth: 1,
          borderColor: colors.borderDanger,
        }}
      >
        <Text style={{ color: colors.danger }}>{label}</Text>

        {desc && (
          <Text
            style={{
              fontSize: 12,
              color: "#888",
              marginTop: 4,
            }}
          >
            {desc}
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  type SwitchItemProps = {
    label: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
  };

  function SwitchItem({ label, value, onValueChange }: SwitchItemProps) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 15,
          borderBottomWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text style={{ color: colors.text }}>{label}</Text>
        <Switch value={value} onValueChange={onValueChange} />
      </View>
    );
  }

  if (loading || !settings) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Header title="Configurações ⚙️" />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Carregando...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Configurações ⚙️" />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* 📍 MAPA */}
        <Section title="Mapa">
          <SwitchItem
            label="Centralizar ao abrir"
            value={settings.autoCenter}
            onValueChange={(value) => updateSetting({ autoCenter: value })}
          />

          <SwitchItem
            label="Mostrar árvores no mapa"
            value={settings.showTrees}
            onValueChange={(value) => updateSetting({ showTrees: value })}
          />

          <View
            style={{
              padding: 15,
              borderBottomWidth: 1,
              borderColor: "#eee",
            }}
          >
            <Text
              style={{
                marginBottom: 8,
                color: colors.text,
              }}
            >
              Tipo de mapa
            </Text>

            <View
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <Picker
                style={{ color: colors.text }}
                dropdownIconColor={colors.text}
                selectedValue={settings.mapType}
                onValueChange={(value) =>
                  updateSetting({
                    mapType: value,
                  })
                }
              >
                <Picker.Item label="Padrão" value="standard" />
                <Picker.Item label="Satélite" value="satellite" />
                <Picker.Item label="Híbrido" value="hybrid" />
                <Picker.Item label="Terreno" value="terrain" />
              </Picker>
            </View>
          </View>
        </Section>

        {/* 🌳 ÁRVORES */}
        <Section title="Árvores">
          <View
            style={{
              padding: 15,
              borderBottomWidth: 1,
              borderColor: "#eee",
            }}
          >
            <Text
              style={{
                marginBottom: 8,
                color: colors.text,
              }}
            >
              Limite de imagens
            </Text>
            <Text
              style={{
                marginBottom: 8,
                color: colors.text,
                fontSize: 11,
              }}
            >
              Árvores salvas não mudarão a quantidade de imagens, somente após
              editá-las.
            </Text>

            <View
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <Picker
                style={{ color: colors.text }}
                selectedValue={settings.maxImages}
                dropdownIconColor={colors.text}
                onValueChange={(value) =>
                  updateSetting({
                    maxImages: value,
                  })
                }
              >
                <Picker.Item label="1 imagem" value={1} />
                <Picker.Item label="3 imagens" value={3} />
                <Picker.Item label="5 imagens" value={5} />
                <Picker.Item label="10 imagens" value={10} />
              </Picker>
            </View>
          </View>

          <SwitchItem
            label="Atualizar localização automática"
            value={settings.autoLocation}
            onValueChange={(value) => updateSetting({ autoLocation: value })}
          />
        </Section>

        {/* 📤 COMPARTILHAMENTO */}
        <Section title="Compartilhamento">
          <Item
            label="Editar texto do compartilhamento"
            onPress={() => router.push("/(stack)/settings/share-text")}
          />

          <SwitchItem
            label="Incluir Google Maps"
            value={settings.includeMaps}
            onValueChange={(value) => updateSetting({ includeMaps: value })}
          />
        </Section>

        {/* 🎨 SISTEMA */}
        <Section title="Sistema">
          <Item label="Tema" onPress={() => alert("Em breve ✨")} />

          <Item label="Exportar árvores" onPress={exportTrees} />

          <Item label="Importar árvores" onPress={importTrees} />

          <Item
            label="Sobre o app"
            onPress={() =>
              Alert.alert(
                "Pé na Rua 🌳",
                "App para registrar árvores e locais.\nVersão 1.0",
              )
            }
          />
        </Section>

        <DangerSection title="Zona de perigo">
          <DangerItem
            label="Resetar configurações"
            desc="Restaura todas as configurações para os valores padrão do aplicativo."
            onPress={handleResetSettings}
          />

          <DangerItem
            label="Limpar árvores"
            desc="Remove permanentemente todas as árvores cadastradas no aplicativo."
            onPress={handleClearTrees}
          />

          <DangerItem
            label="Resetar aplicativo"
            desc="Apaga todas as árvores e redefine todas as configurações do aplicativo."
            onPress={handleResetApp}
          />
        </DangerSection>
      </ScrollView>
    </View>
  );
}
