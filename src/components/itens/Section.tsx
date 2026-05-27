import { ReactNode } from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/src/hooks/useTheme";

type SectionProps = {
  title: string;
  children?: ReactNode;
};

export function Section({ title, children }: SectionProps) {
  const { colors } = useTheme();

  return (
    <View style={{ marginBottom: 25 }}>
      <Text
        style={{
          fontSize: 13,
          fontWeight: "700",
          marginBottom: 10,
          color: colors.textSecondary,
          letterSpacing: 0.5,
        }}
      >
        {title.toUpperCase()}
      </Text>

      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 16,
          overflow: "hidden",
          shadowColor: colors.shadow,
          shadowOpacity: colors.shadowOpacity,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        {children}
      </View>
    </View>
  );
}

export function DangerSection({ title, children }: SectionProps) {
  const { colors } = useTheme();

  return (
    <View style={{ marginBottom: 25 }}>
      <Text
        style={{
          fontSize: 13,
          fontWeight: "700",
          marginBottom: 10,
          color: colors.danger,
          letterSpacing: 0.5,
        }}
      >
        {title.toUpperCase()}
      </Text>

      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 16,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: colors.borderDanger,
          shadowColor: colors.shadow,
          shadowOpacity: colors.shadowOpacity,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        {children}
      </View>
    </View>
  );
}
