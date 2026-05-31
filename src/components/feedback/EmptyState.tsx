import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { useTheme } from "@/src/hooks/useTheme";
import { FONT_SIZE, ICON_SIZE, SPACING } from "@/src/theme/layout";

type Props = {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
};

export default function EmptyState({
  icon = "leaf-outline",
  title,
  description,
}: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: SPACING.xl * 2,
      }}
    >
      <Ionicons
        name={icon}
        size={ICON_SIZE.xxl + 14}
        color={colors.textMuted}
      />

      <Text
        style={{
          fontSize: FONT_SIZE.md,
          color: colors.textSecondary,
          marginTop: SPACING.sm,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>

      {description && (
        <Text
          style={{
            fontSize: FONT_SIZE.xs + 1,
            color: colors.textMuted,
            marginTop: SPACING.xs + 1,
            textAlign: "center",
          }}
        >
          {description}
        </Text>
      )}
    </View>
  );
}
