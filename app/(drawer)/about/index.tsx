import { ScrollView, Text, View } from "react-native";

import { Item } from "@/src/components/itens/Item";
import { Section } from "@/src/components/itens/Section";
import { useTheme } from "@/src/hooks/useTheme";
import { FINAL } from "@/src/theme/layout";

export default function About() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: FINAL,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          Pé na Rua 🌳
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginBottom: 20,
            lineHeight: 22,
          }}
        >
          Aplicativo para registrar árvores e locais.
        </Text>

        <Section title="📡 Recursos">
          <Item
            label="✅ Funciona offline"
            desc="Todos os dados ficam salvos localmente."
          />

          <Item
            label="🗺️ Google Maps"
            desc="Integração com navegação e localização."
          />

          <Item
            label="📸 Múltiplas imagens"
            desc="Adicione várias fotos para cada árvore."
          />
        </Section>

        <Section title="🛠️ Tecnologias">
          <Item
            label="⚡ React Native + Expo"
            desc="Aplicativo multiplataforma moderno."
          />

          <Item
            label="💾 SQLite local"
            desc="Banco de dados offline no aparelho."
          />

          <Item
            label="🎨 Sistema de temas"
            desc="Suporte a diversas variações de temas."
          />
        </Section>

        <Text
          style={{
            marginTop: 20,
            textAlign: "center",
            color: colors.textMuted,
            fontSize: 13,
          }}
        >
          Pé na Rua 🌳 • v1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}
