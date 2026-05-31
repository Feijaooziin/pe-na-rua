import { ReactNode } from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/src/hooks/useTheme";
import { FONT_SIZE, RADIUS, SHADOWS, SPACING } from "@/src/theme/layout";

type SectionProps = {
  title: string;
  children?: ReactNode;
};

export function Section({ title, children }: SectionProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        marginBottom: SPACING.xxl,
      }}
    >
      <Text
        style={{
          fontSize: FONT_SIZE.xs,
          fontWeight: "700",
          marginBottom: SPACING.sm,
          color: colors.textSecondary,
          letterSpacing: 0.5,
        }}
      >
        {title.toUpperCase()}
      </Text>

      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: RADIUS.lg,
          overflow: "hidden",

          ...SHADOWS.card,

          shadowColor: colors.shadow,
          shadowOpacity: colors.shadowOpacity,
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
    <View
      style={{
        marginBottom: SPACING.xxl,
      }}
    >
      <Text
        style={{
          fontSize: FONT_SIZE.xs,
          fontWeight: "700",
          marginBottom: SPACING.sm,
          color: colors.danger,
          letterSpacing: 0.5,
        }}
      >
        {title.toUpperCase()}
      </Text>

      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: RADIUS.lg,
          overflow: "hidden",

          borderWidth: 1,
          borderColor: colors.borderDanger,

          ...SHADOWS.card,

          shadowColor: colors.shadow,
          shadowOpacity: colors.shadowOpacity,
        }}
      >
        {children}
      </View>
    </View>
  );
}
