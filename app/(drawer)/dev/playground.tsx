import { Alert, ScrollView, Text, View } from "react-native";

import { colors } from "@/src/theme/colors";

import CategoryBadge from "@/Componentes Teste/badges/CategoryBadge";
import { Item } from "@/Componentes Teste/itens/Item";
import { Section } from "@/Componentes Teste/itens/Section";
import { SwitchItem } from "@/Componentes Teste/itens/SwitchItem";
import Header from "@/src/components/Header";
import { useState } from "react";

export default function Playground() {
  const [teste, setTeste] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Header title="Playground 🧪" />

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

          <Section title="Teste">
            <Item label="Teste 1" onPress={() => Alert.alert("Funcionou!")} />
            <Item
              label="Teste 2"
              onPress={() => Alert.alert("Funcionou também!")}
            />
            <SwitchItem
              label={teste ? "Valor: ON" : "Valor: OFF"}
              value={teste}
              onValueChange={(value) => setTeste(value)}
            />
          </Section>
        </View>
      </ScrollView>
    </View>
  );
}
