import { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";

import Header from "@/src/components/Header";
import { colors } from "@/src/theme/colors";

export default function Settings() {
  const [autoCenter, setAutoCenter] = useState(true);
  const [showTrees, setShowTrees] = useState(true);
  const [includeMaps, setIncludeMaps] = useState(true);

  function Section({ title, children }: any) {
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

  function Item({ label, onPress }: any) {
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

  function SwitchItem({ label, value, onValueChange }: any) {
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

  function DangerItem({ label, onPress }: any) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          padding: 15,
        }}
      >
        <Text style={{ color: colors.danger, fontWeight: "bold" }}>
          {label}
        </Text>
      </TouchableOpacity>
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
            value={autoCenter}
            onValueChange={setAutoCenter}
          />

          <SwitchItem
            label="Mostrar árvores automaticamente"
            value={showTrees}
            onValueChange={setShowTrees}
          />

          <Item label="Tipo de mapa" onPress={() => {}} />
        </Section>

        {/* 🌳 ÁRVORES */}
        <Section title="Árvores">
          <Item label="Limite de imagens" onPress={() => {}} />

          <SwitchItem
            label="Atualizar localização automática"
            value={true}
            onValueChange={() => {}}
          />
        </Section>

        {/* 📤 COMPARTILHAMENTO */}
        <Section title="Compartilhamento">
          <Item label="Editar texto padrão" onPress={() => {}} />

          <SwitchItem
            label="Incluir Google Maps"
            value={includeMaps}
            onValueChange={setIncludeMaps}
          />
        </Section>

        {/* 🎨 SISTEMA */}
        <Section title="Sistema">
          <Item label="Tema" onPress={() => {}} />

          <DangerItem label="Limpar dados" onPress={() => {}} />

          <Item label="Sobre o app" onPress={() => {}} />
        </Section>
      </ScrollView>
    </View>
  );
}
