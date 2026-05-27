import { Text, View } from "react-native";

import Header from "@/src/components/Header";
import { useTheme } from "@/src/hooks/useTheme";

export default function About() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Header title="Sobre ℹ️" />

      <View
        style={{
          flex: 1,
          padding: 20,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Pé na Rua 🌳
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            lineHeight: 22,
          }}
        >
          Aplicativo para registrar árvores e locais.
        </Text>

        <Text
          style={{
            marginTop: 20,
            color: colors.textMuted,
          }}
        >
          Versão 1.0.0
        </Text>
      </View>
    </View>
  );
}
