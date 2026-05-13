import { ReactNode } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import * as Updates from "expo-updates";

import Header from "@/src/components/Header";
import { db } from "@/src/database/db";
import { useSettings } from "@/src/hooks/useSettings";
import { resetSettings } from "@/src/storage/settings";
import { colors } from "@/src/theme/colors";
import { router } from "expo-router";

export default function Settings() {
  const { settings, loading, updateSetting } = useSettings();

  // function handleClearData() {
  //   Alert.alert(
  //     "Limpar dados",
  //     "Isso vai apagar todas as árvores e configurações. Deseja continuar?",
  //     [
  //       { text: "Cancelar", style: "cancel" },
  //       {
  //         text: "Limpar",
  //         style: "destructive",
  //         onPress: async () => {
  //           try {
  //             // apagar banco
  //             db.runSync("DELETE FROM trees");

  //             // resetar settings
  //             await resetSettings();

  //             Alert.alert("Sucesso", "Dados apagados com sucesso!");
  //           } catch (error) {
  //             console.log(error);
  //           }
  //         },
  //       },
  //     ],
  //   );
  // }

  function handleClearData() {
    Alert.alert(
      "Limpar dados",
      "Isso vai apagar todas as árvores e configurações. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: async () => {
            try {
              // apagar banco
              db.runSync("DELETE FROM trees");

              // resetar settings
              await resetSettings();

              Alert.alert("Sucesso", "Dados apagados com sucesso!");

              setTimeout(async () => {
                await Updates.reloadAsync();
              }, 1000);
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

  type ItemProps = {
    label: string;
    onPress: () => void;
  };

  function Item({ label, onPress }: ItemProps) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          padding: 15,
          borderBottomWidth: 1,
          borderColor: "#eee",
        }}
      >
        <Text style={{ color: colors.text }}>{label}</Text>
      </TouchableOpacity>
    );
  }

  function DangerItem({ label, onPress }: ItemProps) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          padding: 15,
          borderBottomWidth: 1,
          borderColor: "#eee",
        }}
      >
        <Text style={{ color: colors.danger, fontWeight: "bold" }}>
          {label}
        </Text>
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
          borderColor: "#eee",
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
                dropdownIconColor={colors.primary}
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
          <Item
            label={`Limite de imagens: ${settings.maxImages}`}
            onPress={() =>
              updateSetting({
                maxImages: settings.maxImages === 10 ? 5 : 10,
              })
            }
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
              Limite de imagens
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
                dropdownIconColor={colors.primary}
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

          <DangerItem label="Limpar dados" onPress={handleClearData} />

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
      </ScrollView>
    </View>
  );
}
