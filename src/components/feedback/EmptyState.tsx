import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { useTheme } from "@/src/hooks/useTheme";

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
        marginTop: 40,
      }}
    >
      <Ionicons name={icon} size={48} color={colors.textMuted} />

      <Text
        style={{
          fontSize: 16,
          color: colors.textSecondary,
          marginTop: 10,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>

      {description && (
        <Text
          style={{
            fontSize: 13,
            color: colors.textMuted,
            marginTop: 5,
            textAlign: "center",
          }}
        >
          {description}
        </Text>
      )}
    </View>
  );
}
