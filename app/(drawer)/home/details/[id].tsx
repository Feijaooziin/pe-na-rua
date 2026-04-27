import * as Linking from "expo-linking";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { deleteTree, getTreeById } from "@/src/database/trees";
import { colors } from "@/src/theme/colors";
import { Tree } from "@/src/types/tree";
import { Ionicons } from "@expo/vector-icons";

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

  async function handleShare(tree: Tree) {
    const latitude = tree.latitude;
    const longitude = tree.longitude;

    const mapsLink =
      latitude && longitude
        ? `https://www.google.com/maps?q=${latitude},${longitude}`
        : "Localização não disponível";

    const message = `🌳 *${tree.name}*

${tree.description || "Sem descrição"}

📍 Localização:
${mapsLink}

📱 Registrado no app Pé na Rua`;

    try {
      await Share.share({
        message,
      });
    } catch (error) {
      console.log(error);
    }
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
            marginTop: 12,
            fontSize: 16,
            color: "#444",
          }}
        >
          {tree.description}
        </Text>

        {/* COORDENADAS */}
        <View
          style={{
            marginTop: 12,
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
            marginTop: 12,
            backgroundColor: "#1976d2",
            padding: 14,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Ionicons name="map-outline" size={18} color={"#fff"} />
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Abrir no Google Maps
          </Text>
        </TouchableOpacity>

        {/* BOTÃO SHARE */}
        <TouchableOpacity
          onPress={() => handleShare(tree)}
          style={{
            marginTop: 12,
            backgroundColor: colors.primary,
            padding: 14,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Ionicons name="logo-whatsapp" size={18} color={"#fff"} />
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Compartilhar
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
          {/* BOTÃO EDITAR */}
          <TouchableOpacity
            onPress={() => router.push(`/home/edit/${tree.id}` as any)}
            style={{
              flex: 1,
              backgroundColor: colors.background,
              borderWidth: 1,
              borderColor: colors.secondary,
              borderRadius: 10,
              paddingVertical: 12,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Ionicons name="create" size={18} color={colors.secondary} />
            <Text style={{ color: colors.secondary, fontWeight: "bold" }}>
              Editar
            </Text>
          </TouchableOpacity>

          {/* BOTÃO DELETAR */}
          <TouchableOpacity
            onPress={handleDelete}
            style={{
              flex: 1,
              backgroundColor: colors.background,
              borderWidth: 1,
              borderColor: colors.danger,
              borderRadius: 10,
              paddingVertical: 12,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Ionicons name="trash" size={18} color={colors.danger} />
            <Text style={{ color: colors.danger, fontWeight: "bold" }}>
              Deletar
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* MODAL IMAGEM FULLSCREEN */}
      <Modal visible={isViewerOpen} transparent>
        <View style={{ flex: 1, backgroundColor: "#000" }}>
          <ImageViewer
            imageUrls={images.map((img) => ({ url: img }))}
            index={selectedIndex}
            onChange={(index) => setSelectedIndex(index ?? 0)}
            renderIndicator={() => (
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
            )}
            renderImage={(props) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  {...props}
                  style={{
                    width: "90%",
                    height: "80%",
                    borderRadius: 12,
                  }}
                  resizeMode="contain"
                />
              </View>
            )}
            enableImageZoom={false}
            saveToLocalByLongPress={false}
          />

          {/* ❌ BOTÃO FECHAR */}
          <TouchableOpacity
            onPress={() => setIsViewerOpen(false)}
            style={{
              position: "absolute",
              top: 50,
              right: 20,
              zIndex: 10,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>FECHAR ✕</Text>
          </TouchableOpacity>

          {/* ⬅️ SETA ESQUERDA */}
          {selectedIndex > 0 && (
            <TouchableOpacity
              onPress={() => setSelectedIndex(selectedIndex - 1)}
              style={{
                position: "absolute",
                left: 30,
                top: "90%",
                zIndex: 10,
              }}
            >
              <Ionicons name="arrow-back-circle" size={38} color={"#fff"} />
            </TouchableOpacity>
          )}

          {/* ➡️ SETA DIREITA */}
          {selectedIndex < images.length - 1 && (
            <TouchableOpacity
              onPress={() => setSelectedIndex(selectedIndex + 1)}
              style={{
                position: "absolute",
                right: 30,
                top: "90%",
                zIndex: 10,
              }}
            >
              <Ionicons name="arrow-forward-circle" size={38} color={"#fff"} />
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}
