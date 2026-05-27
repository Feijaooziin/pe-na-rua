import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { FAB_BOTTOM } from "@/src/constants/layout";
import { useTheme } from "@/src/hooks/useTheme";

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
        right: 18,
        width: 60,
        height: 60,
        borderRadius: 999,
        backgroundColor: colors.fab,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: colors.shadow,
        shadowOpacity: colors.shadowOpacity,
        shadowRadius: 6,
        elevation: 6,
      }}
    >
      <Ionicons name={icon} size={32} color={colors.fabText} />
    </TouchableOpacity>
  );
}
