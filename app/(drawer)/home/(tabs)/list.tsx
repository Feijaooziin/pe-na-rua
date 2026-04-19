import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { getTrees } from "@/src/database/trees";
import { colors } from "@/src/theme/colors";
import { Tree } from "@/src/types/tree";

export default function List() {
  const [trees, setTrees] = useState<Tree[]>([]);

  useFocusEffect(
    useCallback(() => {
      const data = getTrees();
      setTrees(data);
    }, []),
  );

  function renderItem({ item }: { item: Tree }) {
    return (
      <TouchableOpacity
        onPress={() => router.push(`/home/details/${item.id}` as any)}
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          marginBottom: 15,
          overflow: "hidden",
        }}
      >
        {/* IMAGEM */}
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={{ width: "100%", height: 150 }}
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
        <View style={{ padding: 15 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: colors.text,
            }}
          >
            {item.name}
          </Text>

          <Text numberOfLines={2} style={{ marginTop: 5, color: "#555" }}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 15,
      }}
    >
      {/* HEADER */}
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          color: colors.text,
          marginBottom: 10,
        }}
      >
        🌳 Pé na Rua
      </Text>

      {/* LISTA */}
      <FlatList
        data={trees}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ marginTop: 20 }}>Nenhuma árvore cadastrada 🌱</Text>
        }
      />

      {/* FAB */}
      <TouchableOpacity
        onPress={() => router.push("/home/create" as any)}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: colors.primary,
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          elevation: 5,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 30 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
