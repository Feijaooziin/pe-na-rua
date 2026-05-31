import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { useTheme } from "@/src/hooks/useTheme";
import { ICON_SIZE, RADIUS, SHADOWS, SPACING } from "@/src/theme/layout";

type Props = {
  favorite?: boolean;
  onPress?: () => void;
};

export default function FavoriteButton({ favorite, onPress }: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        position: "absolute",
        bottom: SPACING.md,
        right: SPACING.md,

        width: 38,
        height: 38,
        borderRadius: RADIUS.full,

        backgroundColor: colors.surfaceSecondary,

        justifyContent: "center",
        alignItems: "center",

        ...SHADOWS.card,

        shadowColor: colors.shadow,
        shadowOpacity: colors.shadowOpacity,
      }}
    >
      <Ionicons
        name={favorite ? "heart" : "heart-outline"}
        size={ICON_SIZE.md}
        color={favorite ? colors.danger : colors.iconSecondary}
      />
    </TouchableOpacity>
  );
}
