import { ScrollView, View } from "react-native";

import { Item } from "@/src/components/itens/Item";
import { Section } from "@/src/components/itens/Section";
import { useTheme } from "@/src/hooks/useTheme";
import { FINAL } from "@/src/theme/layout";

export default function Teste() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: FINAL,
        }}
      >
        <Section title="📡 Teste">
          <Item
            label="Teste"
            desc="To só testando um esquema de rotas diferente."
          />
        </Section>
      </ScrollView>
    </View>
  );
}
