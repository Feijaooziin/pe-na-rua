import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import Header from "@/src/components/Header";
import { getTrees } from "@/src/database/trees";
import { colors } from "@/src/theme/colors";
import { Tree } from "@/src/types/tree";
import { Ionicons } from "@expo/vector-icons";

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
        {item.image ? (
          <Image
            source={{ uri: item.image }}
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
      }}
    >
      {/* HEADER */}
      <Header />

      {/* LISTA */}
      <FlatList
        data={trees}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        // ListEmptyComponent={
        //   <Text style={{ marginTop: 20 }}>Nenhuma árvore cadastrada 🌱</Text>
        // }
        ListEmptyComponent={
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "#777" }}>
              Nenhuma árvore cadastrada 🌱
            </Text>

            <Text style={{ fontSize: 13, color: "#aaa", marginTop: 5 }}>
              Toque no botão + para começar
            </Text>
          </View>
        }
        contentContainerStyle={{ padding: 15, paddingBottom: 100 }}
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
