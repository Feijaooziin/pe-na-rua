import { router } from "expo-router";
import { Alert, ScrollView, Text, View } from "react-native";

import { db } from "@/src/database/db";
import { useSettings } from "@/src/hooks/useSettings";
import { useTheme } from "@/src/hooks/useTheme";
import { exportTrees, importTrees } from "@/src/services/backup";
import { resetSettings } from "@/src/storage/settings";

import Header from "@/src/components/Header";
import { DangerItem, Item } from "@/src/components/itens/Item";
import PickerItem from "@/src/components/itens/PickerItem";
import { DangerSection, Section } from "@/src/components/itens/Section";
import { SwitchItem } from "@/src/components/itens/SwitchItem";

export default function Settings() {
  const { colors } = useTheme();

  const { settings, loading, updateSetting, loadSettings } = useSettings();

  async function handleReloadSettings() {
    await loadSettings();
  }

  function handleResetSettings() {
    Alert.alert(
      "Resetar configurações",
      "Todas as configurações voltarão ao padrão.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Resetar",
          onPress: async () => {
            try {
              await resetSettings();

              await handleReloadSettings();

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
        {
          text: "Cancelar",
          style: "cancel",
        },
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
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Resetar tudo",
          style: "destructive",
          onPress: async () => {
            try {
              db.runSync("DELETE FROM trees");

              await resetSettings();

              await handleReloadSettings();

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

  if (loading || !settings) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <Header title="Configurações ⚙️" />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.text,
            }}
          >
            Carregando...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Header title="Configurações ⚙️" />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 🎨 TEMA */}
        <Section title="Tema">
          <Item
            label={
              settings.theme === "system"
                ? "Tema do sistema"
                : settings.theme === "light"
                  ? "Tema claro"
                  : "Tema escuro"
            }
            onPress={() => Alert.alert("Tema atual", settings.theme)}
          />

          <PickerItem
            label="Selecionar tema"
            value={settings.theme}
            onChange={(value) =>
              updateSetting({
                theme: value,
              })
            }
            items={[
              {
                label: "📱 Sistema",
                value: "system",
              },
              {
                label: "🌞 Claro",
                value: "light",
              },
              {
                label: "🌙 Escuro",
                value: "dark",
              },
            ]}
          />
        </Section>

        {/* 📍 MAPA */}
        <Section title="Mapa">
          <SwitchItem
            label="Centralizar ao abrir"
            value={settings.autoCenter}
            onValueChange={(value) =>
              updateSetting({
                autoCenter: value,
              })
            }
          />

          <SwitchItem
            label="Mostrar árvores no mapa"
            value={settings.showTrees}
            onValueChange={(value) =>
              updateSetting({
                showTrees: value,
              })
            }
          />

          <PickerItem
            label="Tipo de mapa"
            value={settings.mapType}
            onChange={(value) =>
              updateSetting({
                mapType: value,
              })
            }
            items={[
              {
                label: "Padrão",
                value: "standard",
              },
              {
                label: "Satélite",
                value: "satellite",
              },
              {
                label: "Híbrido",
                value: "hybrid",
              },
              {
                label: "Terreno",
                value: "terrain",
              },
            ]}
          />
        </Section>

        {/* 🌳 ÁRVORES */}
        <Section title="Árvores">
          <PickerItem
            label="Limite de imagens"
            value={settings.maxImages}
            onChange={(value) =>
              updateSetting({
                maxImages: value,
              })
            }
            items={[
              {
                label: "1 imagem",
                value: 1,
              },
              {
                label: "3 imagens",
                value: 3,
              },
              {
                label: "5 imagens",
                value: 5,
              },
              {
                label: "10 imagens",
                value: 10,
              },
            ]}
          />

          <SwitchItem
            label="Atualizar localização automática"
            value={settings.autoLocation}
            onValueChange={(value) =>
              updateSetting({
                autoLocation: value,
              })
            }
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
            onValueChange={(value) =>
              updateSetting({
                includeMaps: value,
              })
            }
          />
        </Section>

        {/* ⚙️ SISTEMA */}
        <Section title="Sistema">
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

        {/* 🚨 ZONA DE PERIGO */}
        <DangerSection title="Zona de perigo">
          <DangerItem
            label="Resetar configurações"
            desc="Restaura todas as configurações do aplicativo."
            onPress={handleResetSettings}
          />

          <DangerItem
            label="Limpar árvores"
            desc="Remove permanentemente todas as árvores cadastradas."
            onPress={handleClearTrees}
          />

          <DangerItem
            label="Resetar aplicativo"
            desc="Apaga árvores e redefine todas as configurações."
            onPress={handleResetApp}
          />
        </DangerSection>
      </ScrollView>
    </View>
  );
}
