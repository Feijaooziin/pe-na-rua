import { Text, TouchableOpacity } from "react-native";

import { useTheme } from "@/src/hooks/useTheme";
import { FONT_SIZE, SPACING } from "@/src/theme/layout";

type ItemProps = {
  label: string;
  desc?: string;
  onPress?: () => void;
};

export function Item({ label, desc, onPress }: ItemProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: FONT_SIZE.sm,
          fontWeight: "500",
        }}
      >
        {label}
      </Text>

      {desc && (
        <Text
          style={{
            fontSize: FONT_SIZE.xs,
            color: colors.textMuted,
            marginTop: SPACING.xs + 1,
            lineHeight: 18,
          }}
        >
          {desc}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export function DangerItem({ label, desc, onPress }: ItemProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderColor: colors.borderDanger,
        backgroundColor: colors.surface,
      }}
    >
      <Text
        style={{
          color: colors.danger,
          fontSize: FONT_SIZE.sm,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>

      {desc && (
        <Text
          style={{
            fontSize: FONT_SIZE.xs,
            color: colors.textMuted,
            marginTop: SPACING.xs + 1,
            lineHeight: 18,
          }}
        >
          {desc}
        </Text>
      )}
    </TouchableOpacity>
  );
}
