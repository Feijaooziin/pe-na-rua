import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import CategoryBadge from "@/src/components/badges/CategoryBadge";
import FilterBar from "@/src/components/FilterBar";
import Header from "@/src/components/Header";
import { getTrees, toggleFavorite } from "@/src/database/trees";
import { useTheme } from "@/src/hooks/useTheme";
import { Tree } from "@/src/types/tree";
import { formatDate } from "@/src/utils/date";

export default function List() {
  const { colors } = useTheme();

  const [trees, setTrees] = useState<Tree[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortField, setSortField] = useState<
    "created_at" | "name" | "category"
  >("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredTrees = trees.filter((tree) => {
    const matchesCategory =
      selectedCategory === "all" || tree.category === selectedCategory;

    const matchesSearch = tree.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFavorite = !showFavoritesOnly || tree.favorite;

    return matchesCategory && matchesSearch && matchesFavorite;
  });

  const sortedTrees = [...filteredTrees].sort((a, b) => {
    let comparison = 0;

    if (sortField === "name") {
      comparison = (a.name ?? "").localeCompare(b.name ?? "");
    }

    if (sortField === "category") {
      comparison = (a.category ?? "").localeCompare(b.category ?? "");
    }

    if (sortField === "created_at") {
      comparison =
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  useFocusEffect(
    useCallback(() => {
      const data = getTrees();
      setTrees(data);
    }, []),
  );

  function handleFavorite(tree: Tree) {
    if (!tree.id) return;

    toggleFavorite(tree.id, !tree.favorite);

    setTrees((prev) =>
      prev.map((item) =>
        item.id === tree.id
          ? {
              ...item,
              favorite: !item.favorite,
            }
          : item,
      ),
    );
  }

  function renderItem({ item }: { item: Tree }) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push(`/home/details/${item.id}` as any)}
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
        {Array.isArray(item.images) && item.images.length > 0 ? (
          <Image
            source={{ uri: item.images[0] }}
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
            <Text style={{ color: colors.textMuted }}>Sem imagem</Text>
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
            {item.name}
          </Text>

          {/* BADGE */}
          <CategoryBadge category={item.category} />

          <Text
            numberOfLines={2}
            style={{
              marginTop: 5,
              color: colors.textSecondary,
              paddingRight: 50,
            }}
          >
            {item.description}
          </Text>

          <Text
            style={{
              marginTop: 8,
              fontSize: 12,
              color: colors.textMuted,
            }}
          >
            📅 {formatDate(item.created_at)}
          </Text>

          {/* FAV BTN */}
          <TouchableOpacity
            onPress={() => handleFavorite(item)}
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
            }}
          >
            <Ionicons
              name={item.favorite ? "heart" : "heart-outline"}
              size={22}
              color={item.favorite ? "#e53935" : "#666"}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      {/* HEADER */}
      <Header />
      <FilterBar
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* LISTA */}
      <FlatList
        data={sortedTrees}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Ionicons name="leaf-outline" size={48} color={colors.textMuted} />

            <Text
              style={{
                fontSize: 16,
                color: colors.textSecondary,
                marginTop: 10,
                fontWeight: "bold",
              }}
            >
              Nenhum resultado encontrado
            </Text>

            <Text
              style={{
                fontSize: 13,
                color: colors.textMuted,
                marginTop: 5,
                textAlign: "center",
              }}
            >
              Tente mudar os filtros{`\n`}ou adicionar novas plantas 🌱
            </Text>
          </View>
        }
        contentContainerStyle={{
          padding: 15,
          paddingBottom: 100,
        }}
      />

      {/* FAB */}
      <TouchableOpacity
        onPress={() => router.push("/home/create" as any)}
        style={{
          position: "absolute",
          bottom: 18,
          right: 18,
          backgroundColor: colors.primary,
          shadowColor: colors.shadow,
          shadowOpacity: colors.shadowOpacity,
          shadowRadius: 6,
          elevation: 6,
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
