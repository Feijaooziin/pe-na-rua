import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";

import FloatingButton from "@/src/components/buttons/FloatingButton";
import TreeCard from "@/src/components/cards/TreeCard";
import EmptyState from "@/src/components/feedback/EmptyState";
import FilterBar from "@/src/components/FilterBar";
import Header from "@/src/components/Header";
import { getTrees, toggleFavorite } from "@/src/database/trees";
import { useTheme } from "@/src/hooks/useTheme";
import { Tree } from "@/src/types/tree";

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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      {/* HEADER */}
      <Header />

      {/* FILTRO */}
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
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TreeCard tree={item} onFavorite={() => handleFavorite(item)} />
        )}
        ListEmptyComponent={
          <EmptyState
            title="Nenhum resultado encontrado"
            description={`Tente mudar os filtros\nou adicionar novas plantas 🌱`}
          />
        }
        contentContainerStyle={{
          padding: 15,
          paddingBottom: 120,
        }}
      />

      {/* FAB */}
      <FloatingButton
        icon="add"
        onPress={() => router.push("/home/create" as any)}
      />
    </View>
  );
}
