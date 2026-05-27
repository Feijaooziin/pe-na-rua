import { router } from "expo-router";
import { Alert, ScrollView, Text, View } from "react-native";

import { db } from "@/src/database/db";
import { getTrees } from "@/src/database/trees";
import { useSettings } from "@/src/hooks/useSettings";
import { useTheme } from "@/src/hooks/useTheme";
import { exportTrees, importTrees } from "@/src/services/backup";
import { resetSettings } from "@/src/storage/settings";

import { CustomAlertDanger } from "@/src/components/CustomAlert";
import Header from "@/src/components/Header";
import { DangerItem, Item } from "@/src/components/itens/Item";
import PickerItem from "@/src/components/itens/PickerItem";
import { DangerSection, Section } from "@/src/components/itens/Section";
import { SwitchItem } from "@/src/components/itens/SwitchItem";
import { FINAL } from "@/src/constants/layout";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function Settings() {
  const { colors } = useTheme();

  const [showReset, setShowReset] = useState(false);

  const trees = getTrees();
  const totalTrees = trees.length;
  const totalImages = trees.reduce(
    (acc, tree) => acc + (tree.images?.length || 0),
    0,
  );

  const totalCategories = new Set(trees.map((tree) => tree.category)).size;

  const { settings, loading, updateSetting, loadSettings } = useSettings();

  async function handleReloadSettings() {
    await loadSettings();
  }

  function handleResetSettings() {
    setShowReset(true);
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
          paddingBottom: FINAL,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 🎨 TEMA */}
        <Section title="🎨 Tema">
          <PickerItem
            label="Tema do aplicativo"
            description="Escolha entre claro, escuro ou automático."
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
        <Section title="📍 Mapa">
          <SwitchItem
            label="Centralizar mapa automaticamente"
            value={settings.autoCenter}
            onValueChange={(value) =>
              updateSetting({
                autoCenter: value,
              })
            }
          />

          <SwitchItem
            label="Exibir árvores no mapa"
            value={settings.showTrees}
            onValueChange={(value) =>
              updateSetting({
                showTrees: value,
              })
            }
          />

          <PickerItem
            label="Estilo do mapa"
            description="Defina como o mapa será exibido."
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
        <Section title="🌳 Árvores">
          <PickerItem
            label="Quantidade máxima de imagens"
            description="Define o limite de fotos por árvore cadastrada."
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
            label="Atualizar localização automaticamente"
            value={settings.autoLocation}
            onValueChange={(value) =>
              updateSetting({
                autoLocation: value,
              })
            }
          />
        </Section>

        {/* 📤 COMPARTILHAMENTO */}
        <Section title="📤 Compartilhamento">
          <Item
            label="Editar texto padrão de compartilhamento "
            onPress={() => router.push("/(stack)/settings/share-text")}
          />

          <SwitchItem
            label="Incluir link do Google Maps"
            value={settings.includeMaps}
            onValueChange={(value) =>
              updateSetting({
                includeMaps: value,
              })
            }
          />
        </Section>

        {/* 📦 DADOS */}
        <Section title="📦 Dados">
          <Item
            label="Exportar árvores"
            desc="Salva um backup das árvores cadastradas."
            onPress={exportTrees}
          />

          <Item
            label="Importar árvores"
            desc="Restaura árvores a partir de um backup."
            onPress={importTrees}
          />
        </Section>

        {/* 📊 ESTATÍSTICAS */}
        <Section title="📊 Estatísticas">
          <Item
            label="Árvores cadastradas"
            desc={`${totalTrees} árvores registradas`}
          />

          <Item
            label="Fotos salvas"
            desc={`${totalImages} imagens armazenadas`}
          />

          <Item
            label="Categorias utilizadas"
            desc={`${totalCategories} categorias em uso`}
          />
        </Section>

        {/* 🚨 ZONA DE PERIGO */}
        <DangerSection title="🚨 Zona de perigo">
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

      {/* ------- CUSTOM ALERTS ------- */}
      {/* RESET CONFIGS */}
      <CustomAlertDanger
        visible={showReset}
        title="Resetar configurações"
        message="Todas as configurações voltarão ao padrão."
        cancelText="Cancelar"
        confirmText="Resetar"
        onCancel={() => setShowReset(false)}
        onConfirm={async () => {
          try {
            setShowReset(false);

            await resetSettings();
            await handleReloadSettings();

            Toast.show({
              type: "info",
              text1: "Sucesso",
              text2: "Configurações resetadas com sucesso!",
            });
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </View>
  );
}
