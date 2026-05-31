import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { useTheme } from "@/src/hooks/useTheme";
import {
  FAB_BOTTOM,
  ICON_SIZE,
  RADIUS,
  SHADOWS,
  SPACING,
} from "@/src/theme/layout";

type FloatingButtonProps = {
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

export default function FloatingButton({
  icon = "add",
  onPress,
}: FloatingButtonProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        position: "absolute",
        bottom: FAB_BOTTOM,
        right: SPACING.lg,
        width: 60,
        height: 60,
        borderRadius: RADIUS.full,
        backgroundColor: colors.fab,
        justifyContent: "center",
        alignItems: "center",

        ...SHADOWS.floating,

        shadowColor: colors.shadow,
        shadowOpacity: colors.shadowOpacity,
      }}
    >
      <Ionicons name={icon} size={ICON_SIZE.xxl} color={colors.fabText} />
    </TouchableOpacity>
  );
}
