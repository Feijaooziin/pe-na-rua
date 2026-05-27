import { Text, TouchableOpacity } from "react-native";

import { useTheme } from "@/src/hooks/useTheme";

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
        padding: 16,
        borderBottomWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 15,
          fontWeight: "500",
        }}
      >
        {label}
      </Text>

      {desc && (
        <Text
          style={{
            fontSize: 12,
            color: colors.textMuted,
            marginTop: 5,
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
        padding: 16,
        borderBottomWidth: 1,
        borderColor: colors.borderDanger,
        backgroundColor: colors.surface,
      }}
    >
      <Text
        style={{
          color: colors.danger,
          fontSize: 15,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>

      {desc && (
        <Text
          style={{
            fontSize: 12,
            color: colors.textMuted,
            marginTop: 5,
            lineHeight: 18,
          }}
        >
          {desc}
        </Text>
      )}
    </TouchableOpacity>
  );
}
