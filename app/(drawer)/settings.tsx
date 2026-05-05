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
import { resetSettings } from "@/src/storage/settings";
import { colors } from "@/src/theme/colors";

export default function Settings() {
  const { settings, loading, updateSetting } = useSettings();

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
            label="Mostrar árvores automaticamente"
            value={settings.showTrees}
            onValueChange={(value) => updateSetting({ showTrees: value })}
          />

          <Item
            label={`Tipo de mapa: ${
              settings.mapType === "standard" ? "Padrão" : "Satélite"
            }`}
            onPress={() =>
              updateSetting({
                mapType:
                  settings.mapType === "standard" ? "satellite" : "standard",
              })
            }
          />
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

          <SwitchItem
            label="Atualizar localização automática"
            value={settings.autoLocation}
            onValueChange={(value) => updateSetting({ autoLocation: value })}
          />
        </Section>

        {/* 📤 COMPARTILHAMENTO */}
        <Section title="Compartilhamento">
          <Item
            label="Editar texto padrão"
            onPress={() => alert("Em breve ✨")}
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
