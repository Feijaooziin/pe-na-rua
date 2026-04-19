import { getTrees } from "@/src/database/trees";
import { Tree } from "@/src/types/tree";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Button, FlatList, Image, Text, View } from "react-native";

export default function Home() {
  const [trees, setTrees] = useState<Tree[]>([]);

  useFocusEffect(
    useCallback(() => {
      const data = getTrees();
      setTrees(data);
    }, []),
  );

  return (
    <View style={{ padding: 20 }}>
      <Button
        title="Adicionar árvore"
        onPress={() => router.push("/create" as any)}
      />

      <FlatList
        data={trees}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <View style={{ marginTop: 10 }}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100 }}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}
