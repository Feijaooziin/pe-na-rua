import { colors } from "@/src/theme/colors";
import { ReactNode } from "react";
import { Text, View } from "react-native";

type SectionProps = {
  title: string;
  children?: ReactNode;
};

export function Section({ title, children }: SectionProps) {
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

export function DangerSection({ title, children }: SectionProps) {
  return (
    <View style={{ marginBottom: 25 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          marginBottom: 8,
          color: colors.danger,
        }}
      >
        {title.toUpperCase()}
      </Text>

      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: colors.danger,
        }}
      >
        {children}
      </View>
    </View>
  );
}
