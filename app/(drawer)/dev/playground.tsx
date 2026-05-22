import { ScrollView, Text, View } from "react-native";

import { colors } from "@/src/theme/colors";

import CategoryBadge from "@/Componentes Teste/badges/CategoryBadge";
import Header from "@/src/components/Header";

export default function Playground() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Header title="Playground" />
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

        {/* BADGES */}
        <View
          style={{
            marginBottom: 32,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: colors.text,
              marginBottom: 12,
              flexDirection: "row",
            }}
          >
            🏷️ Badges
          </Text>

          <CategoryBadge category={""} />
          <CategoryBadge category={""} small />
        </View>

        {/* BUTTONS */}
        <View
          style={{
            marginBottom: 32,
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
            🔘 Buttons
          </Text>
        </View>

        {/* CARDS */}
        <View
          style={{
            marginBottom: 32,
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
            🌳 Tree Cards
          </Text>
        </View>

        {/* ITENS */}
        <View
          style={{
            marginBottom: 32,
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
            ⚙️ Settings Items
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
