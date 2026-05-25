import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

import Header from "@/src/components/Header";

import CategoryBadge from "@/Componentes Teste/badges/CategoryBadge";
import { DangerItem, Item } from "@/Componentes Teste/itens/Item";
import PickerItem from "@/Componentes Teste/itens/PickerItem";
import { DangerSection, Section } from "@/Componentes Teste/itens/Section";
import {
  SwitchDangerItem,
  SwitchItem,
} from "@/Componentes Teste/itens/SwitchItem";
import { useSettings } from "@/src/hooks/useSettings";
import { darkTheme, lightTheme } from "@/src/theme/themes";

export default function Playground() {
  const [teste, setTeste] = useState(true);
  const [teste2, setTeste2] = useState(false);
  const [testeDanger, setTesteDanger] = useState(false);
  const [fruta, setFruta] = useState("Maçã");

  const { settings, loadSettings } = useSettings();
  const colors = settings?.theme === "dark" ? darkTheme : lightTheme;
  const isDark = settings?.theme === "dark";

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, []),
  );

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

        {/* 🎨 TEMA */}
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
            🎨 Tema
          </Text>

          <Section title="Aparência">
            <Item label={isDark ? "Tema escuro ativo" : "Tema claro ativo"} />
          </Section>

          <Section title="🌈 Colors Preview">
            <View
              style={{
                backgroundColor: colors.primary,
                height: 50,
                borderRadius: 12,
                margin: 10,
              }}
            />

            <View
              style={{
                backgroundColor: colors.surface,
                height: 50,
                borderRadius: 12,
                marginBottom: 10,
                marginHorizontal: 10,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            />
          </Section>
        </View>

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
            <Item
              label="Teste 1"
              desc="Esse tem descrição."
              onPress={() => Alert.alert("Funcionou!")}
            />
            <Item
              label="Teste 2"
              onPress={() => Alert.alert("Funcionou também!")}
            />
            <SwitchItem
              label={teste ? "Valor: ON" : "Valor: OFF"}
              value={teste}
              onValueChange={(value) => setTeste(value)}
            />

            <PickerItem
              label="Selecione uma fruta"
              value={fruta}
              onChange={setFruta}
              items={[
                { label: "Maçã", value: "maçã" },
                { label: "Banana", value: "banana" },
                { label: "Laranja", value: "laranja" },
                { label: "Uva", value: "uva" },
              ]}
            />
          </Section>

          <DangerSection title="prerigo">
            <DangerItem
              label="Item perigoso"
              desc="Esse é um exemplo de coisa que vai afetar o app."
            />

            <SwitchDangerItem
              label={testeDanger ? "Valor: ON" : "Valor: OFF"}
              value={testeDanger}
              onValueChange={(value) => setTesteDanger(value)}
            />
          </DangerSection>

          <Item
            label="Itens fora da seção"
            onPress={() => Alert.alert("Funcionou!")}
          />
          <SwitchItem
            label={teste2 ? "Valor: ON" : "Valor: OFF"}
            value={teste2}
            onValueChange={(value) => setTeste2(value)}
          />
        </View>
      </ScrollView>
    </View>
  );
}
