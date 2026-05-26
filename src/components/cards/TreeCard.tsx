import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import CategoryBadge from "@/src/components/badges/CategoryBadge";
import FavoriteButton from "@/src/components/buttons/FavoriteButton";
import { useTheme } from "@/src/hooks/useTheme";
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
        borderRadius: 16,
        shadowColor: colors.shadow,
        shadowOpacity: colors.shadowOpacity,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 16,
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
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
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
          <Ionicons name="image-outline" size={32} color={colors.textMuted} />

          <Text
            style={{
              color: colors.textMuted,
              marginTop: 8,
            }}
          >
            Sem imagem
          </Text>
        </View>
      )}

      {/* TEXTO */}
      <View
        style={{
          padding: 15,
          position: "relative",
        }}
      >
        <Text
          style={{
            fontSize: 18,
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
            marginTop: 5,
            color: colors.textSecondary,
            paddingRight: 50,
          }}
        >
          {tree.description}
        </Text>

        <Text
          style={{
            marginTop: 8,
            fontSize: 12,
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
