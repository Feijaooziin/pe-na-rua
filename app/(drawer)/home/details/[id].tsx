import * as Linking from "expo-linking";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { deleteTree, getTreeById } from "@/src/database/trees";
import { colors } from "@/src/theme/colors";
import { Tree } from "@/src/types/tree";

export default function Details() {
  const { id } = useLocalSearchParams();
  const [tree, setTree] = useState<Tree | null>(null);
  const images = Array.isArray(tree?.images) ? tree?.images : [];

  useEffect(() => {
    if (id) {
      const data = getTreeById(Number(id));
      setTree(data);
    }
  }, [id]);

  if (!tree) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  function openMaps() {
    const url = `https://www.google.com/maps?q=${tree?.latitude},${tree?.longitude}`;
    Linking.openURL(url);
  }

  function handleDelete() {
    Alert.alert("Excluir árvore", "Tem certeza que deseja deletar?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          deleteTree(tree?.id!);
          router.back();
        },
      },
    ]);
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      {/* IMAGEM */}

      {images.length > 0 ? (
        <>
          <Image
            source={{ uri: images[0] }}
            style={{ width: "100%", height: 200 }}
          />

          <ScrollView horizontal>
            {images.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 8,
                  marginRight: 10,
                }}
              />
            ))}
          </ScrollView>
        </>
      ) : (
        <View
          style={{
            width: "100%",
            height: 250,
            backgroundColor: "#ccc",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Sem imagem</Text>
        </View>
      )}
      {/* CONTEÚDO */}
      <View style={{ padding: 20 }}>
        {/* NOME */}
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            color: colors.text,
          }}
        >
          {tree.name}
        </Text>

        {/* DESCRIÇÃO */}
        <Text
          style={{
            marginTop: 10,
            fontSize: 16,
            color: "#444",
          }}
        >
          {tree.description}
        </Text>

        {/* COORDENADAS */}
        <View
          style={{
            marginTop: 15,
            padding: 10,
            backgroundColor: "#fff",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Localização</Text>
          <Text>
            📍 {tree.latitude}, {tree.longitude}
          </Text>
        </View>

        {/* BOTÃO MAPS */}
        <TouchableOpacity
          onPress={openMaps}
          style={{
            marginTop: 15,
            backgroundColor: colors.primary,
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Abrir no Google Maps
          </Text>
        </TouchableOpacity>

        {/* BOTÃO EDITAR */}
        <TouchableOpacity
          onPress={() => router.push(`/home/edit/${tree.id}` as any)}
          style={{
            marginTop: 10,
            backgroundColor: colors.secondary,
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Editar</Text>
        </TouchableOpacity>

        {/* BOTÃO DELETAR */}
        <TouchableOpacity
          onPress={handleDelete}
          style={{
            marginTop: 10,
            backgroundColor: colors.danger,
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
