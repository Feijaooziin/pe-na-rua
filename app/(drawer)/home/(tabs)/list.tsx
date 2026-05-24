import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import FilterBar from "@/src/components/FilterBar";
import Header from "@/src/components/Header";
import { getTrees, toggleFavorite } from "@/src/database/trees";
import { colors } from "@/src/theme/colors";
import { Tree } from "@/src/types/tree";
import { getCategoryColor, getCategoryLabel } from "@/src/utils/category";
import { formatDate } from "@/src/utils/date";

export default function List() {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortField, setSortField] = useState<
    "created_at" | "name" | "category"
  >("created_at");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

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
          backgroundColor: "#fff",
          borderRadius: 16,
          shadowColor: "#000",
          shadowOpacity: 0.05,
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
              backgroundColor: "#ddd",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Sem imagem</Text>
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

          <View
            style={{
              alignSelf: "flex-start",
              backgroundColor: getCategoryColor(item.category),
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 100,
              marginTop: 6,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 11,
              }}
            >
              {getCategoryLabel(item.category)}
            </Text>
          </View>

          <Text
            numberOfLines={2}
            style={{
              marginTop: 5,
              color: "#555",
              paddingRight: 50,
            }}
          >
            {item.description}
          </Text>

          <Text
            style={{
              marginTop: 8,
              fontSize: 12,
              color: "#888",
            }}
          >
            📅 {formatDate(item.created_at)}
          </Text>

          <TouchableOpacity
            onPress={() => handleFavorite(item)}
            style={{
              position: "absolute",
              bottom: 12,
              right: 12,
              width: 38,
              height: 38,
              borderWidth: 1,
              borderColor: "#bbb",
              borderRadius: 999,
              backgroundColor: "#eee",
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
            <Ionicons name="leaf-outline" size={48} color="#bbb" />

            <Text
              style={{
                fontSize: 16,
                color: "#777",
                marginTop: 10,
                fontWeight: "bold",
              }}
            >
              Nenhum resultado encontrado
            </Text>

            <Text
              style={{
                fontSize: 13,
                color: "#aaa",
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
          shadowColor: "#000",
          shadowOpacity: 0.2,
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
