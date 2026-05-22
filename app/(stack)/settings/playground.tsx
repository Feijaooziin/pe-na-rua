import { ScrollView, Text, View } from "react-native";

import { colors } from "@/src/theme/colors";

export default function Playground() {
  function Section({ title }: { title: string }) {
    return (
      <View
        style={{
          marginBottom: 25,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: colors.text,
            marginBottom: 12,
          }}
        >
          {title}
        </Text>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 15,
            borderWidth: 1,
            borderColor: "#eee",
          }}
        >
          <Text style={{ color: "#777" }}>Componentes aparecerão aqui...</Text>
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
      <ScrollView
        contentContainerStyle={{
          padding: 15,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#777",
            marginBottom: 20,
            lineHeight: 22,
          }}
        >
          Ambiente para testar componentes, layouts e novas ideias do app.
        </Text>

        <Section title="🏷️ Badges" />

        <Section title="🔘 Buttons" />

        <Section title="🌳 Tree Cards" />

        <Section title="⚙️ Settings Items" />
      </ScrollView>
    </View>
  );
}
