import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { useTheme } from "@/src/hooks/useTheme";

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
        bottom: 12,
        right: 12,

        width: 38,
        height: 38,
        borderRadius: 999,

        backgroundColor: colors.surfaceSecondary,

        justifyContent: "center",
        alignItems: "center",

        elevation: 3,

        shadowColor: colors.shadow,
        shadowOpacity: colors.shadowOpacity,
        shadowRadius: 4,
      }}
    >
      <Ionicons
        name={favorite ? "heart" : "heart-outline"}
        size={22}
        color={favorite ? colors.danger : colors.iconSecondary}
      />
    </TouchableOpacity>
  );
}
