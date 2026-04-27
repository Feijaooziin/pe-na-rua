import * as Linking from "expo-linking";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { deleteTree, getTreeById } from "@/src/database/trees";
import { colors } from "@/src/theme/colors";
import { Tree } from "@/src/types/tree";

export default function Details() {
  const { id } = useLocalSearchParams();
  const { width } = Dimensions.get("window");
  const [tree, setTree] = useState<Tree | null>(null);
  const images = Array.isArray(tree?.images) ? tree?.images : [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const data = getTreeById(Number(id));
      setTree(data);
    }
  }, [id]);

  useEffect(() => {
    if (images.length > 0) {
      setSelectedIndex(0);
    }
  }, [images]);

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
        <View style={{ paddingHorizontal: 12 }}>
          <TouchableOpacity onPress={() => setIsViewerOpen(true)}>
            <Image
              source={{ uri: images[selectedIndex] }}
              style={{
                width: "100%",
                height: 300,
                borderRadius: 12,
                marginTop: 8,
              }}
            />
          </TouchableOpacity>

          <ScrollView horizontal>
            {images.map((img, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedIndex(index)}
              >
                <Image
                  key={index}
                  source={{ uri: img }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                    marginRight: 10,
                    marginTop: 8,
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
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

      {/* MODAL IMAGEM FULLSCREEN */}
      <Modal visible={isViewerOpen} transparent>
        <ImageViewer
          imageUrls={images.map((img) => ({ url: img }))}
          index={selectedIndex}
          onChange={(index) => setSelectedIndex(index ?? 0)}
          onSwipeDown={() => setIsViewerOpen(false)}
          enableSwipeDown
          saveToLocalByLongPress={false}
          backgroundColor="#000"
        />

        {/* indicador */}
        <Text
          style={{
            position: "absolute",
            bottom: 30,
            alignSelf: "center",
            color: "#fff",
            fontSize: 16,
          }}
        >
          {selectedIndex + 1} / {images.length}
        </Text>
      </Modal>
    </ScrollView>
  );
}
