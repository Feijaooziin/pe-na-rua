import { getTrees } from "@/src/database/trees";
import { Tree } from "@/src/types/tree";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function List() {
  const [trees, setTrees] = useState<Tree[]>([]);

  useFocusEffect(
    useCallback(() => {
      const data = getTrees();
      setTrees(data);
    }, []),
  );

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={trees}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/home/details/${item.id}` as any)}
            style={{
              padding: 15,
              backgroundColor: "#fff",
              borderRadius: 10,
              marginBottom: 10,
              elevation: 2,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.name}
            </Text>

            <Text numberOfLines={1}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
