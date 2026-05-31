import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import CategoryBadge from "@/src/components/badges/CategoryBadge";
import FavoriteButton from "@/src/components/buttons/FavoriteButton";
import { useTheme } from "@/src/hooks/useTheme";
import {
  FONT_SIZE,
  ICON_SIZE,
  RADIUS,
  SHADOWS,
  SPACING,
} from "@/src/theme/layout";
import { Tree } from "@/src/types/tree";
import { formatDate } from "@/src/utils/date";

type Props = {
  tree: Tree;
  onFavorite: () => void;
};

export default function TreeCard({ tree, onFavorite }: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push(`/home/details/${tree.id}` as any)}
      style={{
        backgroundColor: colors.surface,
        borderRadius: RADIUS.lg,

        ...SHADOWS.card,

        shadowColor: colors.shadow,
        shadowOpacity: colors.shadowOpacity,

        marginBottom: SPACING.lg,
        overflow: "hidden",
      }}
    >
      {/* IMAGEM */}
      {Array.isArray(tree.images) && tree.images.length > 0 ? (
        <Image
          source={{ uri: tree.images[0] }}
          style={{
            width: "100%",
            height: 150,
            borderTopLeftRadius: RADIUS.lg,
            borderTopRightRadius: RADIUS.lg,
          }}
        />
      ) : (
        <View
          style={{
            height: 150,
            backgroundColor: colors.borderLight,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="image-outline"
            size={ICON_SIZE.xl}
            color={colors.textMuted}
          />

          <Text
            style={{
              color: colors.textMuted,
              marginTop: SPACING.sm,
            }}
          >
            Sem imagem
          </Text>
        </View>
      )}

      {/* TEXTO */}
      <View
        style={{
          padding: SPACING.lg,
          position: "relative",
        }}
      >
        <Text
          style={{
            fontSize: FONT_SIZE.lg,
            fontWeight: "bold",
            color: colors.text,
          }}
        >
          {tree.name}
        </Text>

        <CategoryBadge category={tree.category} />

        <Text
          numberOfLines={2}
          style={{
            marginTop: SPACING.xs + 1,
            color: colors.textSecondary,
            paddingRight: 50,
          }}
        >
          {tree.description}
        </Text>

        <Text
          style={{
            marginTop: SPACING.sm,
            fontSize: FONT_SIZE.xs,
            color: colors.textMuted,
          }}
        >
          📅 {formatDate(tree.created_at)}
        </Text>

        <FavoriteButton favorite={tree.favorite} onPress={onFavorite} />
      </View>
    </TouchableOpacity>
  );
}
