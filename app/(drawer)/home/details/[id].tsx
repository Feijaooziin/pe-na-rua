import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { FINAL } from "@/src/constants/layout";
import { deleteTree, getTreeById } from "@/src/database/trees";
import { useSettings } from "@/src/hooks/useSettings";
import { useTheme } from "@/src/hooks/useTheme";
import { shareTree } from "@/src/services/shareTree";
import { Tree } from "@/src/types/tree";
import { getCategoryColor, getCategoryLabel } from "@/src/utils/category";
import { formatDate } from "@/src/utils/date";
import { downloadImage } from "@/src/utils/downloadImage";

export default function Details() {
  const { id } = useLocalSearchParams();

  const { colors } = useTheme();

  const { settings } = useSettings();

  const [tree, setTree] = useState<Tree | null>(null);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const images = Array.isArray(tree?.images) ? tree.images : [];

  useFocusEffect(
    useCallback(() => {
      if (id) {
        const data = getTreeById(Number(id));

        setTree(data);
      }
    }, [id]),
  );

  useEffect(() => {
    if (images.length > 0) {
      setSelectedIndex(0);
    }
  }, [images]);

  function openMaps() {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${tree?.latitude},${tree?.longitude}`;
    Linking.openURL(url);
  }

  function handleDelete() {
    Alert.alert("Excluir árvore", "Tem certeza que deseja deletar?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
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

  if (!tree) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <Text
          style={{
            color: colors.text,
          }}
        >
          Carregando...
        </Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
        contentContainerStyle={{
          paddingBottom: FINAL,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* IMAGEM */}
        {images.length > 0 ? (
          <View
            style={{
              paddingHorizontal: 12,
            }}
          >
            <TouchableOpacity onPress={() => setIsViewerOpen(true)}>
              <Image
                source={{ uri: images[selectedIndex] }}
                style={{
                  width: "100%",
                  height: 300,
                  borderRadius: 16,
                  marginTop: 12,
                }}
              />
            </TouchableOpacity>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginTop: 10,
              }}
            >
              {images.map((img, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedIndex(index)}
                  style={{
                    marginRight: 10,
                  }}
                >
                  <Image
                    source={{ uri: img }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 10,

                      borderWidth: selectedIndex === index ? 2 : 0,

                      borderColor:
                        selectedIndex === index
                          ? colors.primary
                          : "transparent",
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
              backgroundColor: colors.surface,

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.textMuted,
              }}
            >
              Sem imagem
            </Text>
          </View>
        )}

        {/* CONTEÚDO */}
        <View
          style={{
            padding: 20,
          }}
        >
          {/* NOME */}
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: colors.text,
            }}
          >
            {tree.name}
          </Text>

          {/* CATEGORIA */}
          <View
            style={{
              alignSelf: "flex-start",

              backgroundColor: getCategoryColor(tree.category),

              paddingHorizontal: 12,
              paddingVertical: 6,

              borderRadius: 999,

              marginTop: 12,
              marginBottom: 4,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 13,
              }}
            >
              {getCategoryLabel(tree.category)}
            </Text>
          </View>

          {/* DATA */}
          <Text
            style={{
              marginTop: 10,

              color: colors.textMuted,

              fontSize: 13,
            }}
          >
            📅 Cadastrada em {formatDate(tree.created_at)}
          </Text>

          {/* DESCRIÇÃO */}
          <Text
            style={{
              marginTop: 18,

              fontSize: 16,

              lineHeight: 24,

              color: colors.textSecondary,
            }}
          >
            {tree.description}
          </Text>

          {/* COORDENADAS */}
          <View
            style={{
              marginTop: 18,

              padding: 14,

              backgroundColor: colors.surface,

              borderRadius: 14,

              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontWeight: "bold",
                marginBottom: 6,
              }}
            >
              Localização
            </Text>

            <Text
              style={{
                color: colors.textSecondary,
              }}
            >
              📍 {tree.latitude}, {tree.longitude}
            </Text>
          </View>

          {/* BOTÃO MAPS */}
          <TouchableOpacity
            onPress={openMaps}
            style={{
              marginTop: 18,

              backgroundColor: "#1976d2",

              padding: 15,

              borderRadius: 14,

              alignItems: "center",
              justifyContent: "center",

              flexDirection: "row",

              gap: 10,
            }}
          >
            <Ionicons name="navigate-outline" size={18} color="#fff" />

            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Navegar até a árvore
            </Text>
          </TouchableOpacity>

          {/* BOTÃO SHARE */}
          <TouchableOpacity
            onPress={() => shareTree(tree, settings as any)}
            style={{
              marginTop: 12,

              backgroundColor: colors.primary,

              padding: 15,

              borderRadius: 14,

              alignItems: "center",
              justifyContent: "center",

              flexDirection: "row",

              gap: 10,
            }}
          >
            <Ionicons name="logo-whatsapp" size={18} color="#fff" />

            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Compartilhar
            </Text>
          </TouchableOpacity>

          {/* BOTÕES */}
          <View
            style={{
              flexDirection: "row",
              gap: 10,

              marginTop: 12,
            }}
          >
            {/* EDITAR */}
            <TouchableOpacity
              onPress={() => router.push(`/home/edit/${tree.id}` as any)}
              style={{
                flex: 1,

                backgroundColor: colors.surface,

                borderWidth: 1,
                borderColor: colors.secondary,

                borderRadius: 14,

                paddingVertical: 14,

                alignItems: "center",
                justifyContent: "center",

                flexDirection: "row",

                gap: 10,
              }}
            >
              <Ionicons
                name="create-outline"
                size={18}
                color={colors.secondary}
              />

              <Text
                style={{
                  color: colors.secondary,
                  fontWeight: "bold",
                }}
              >
                Editar
              </Text>
            </TouchableOpacity>

            {/* DELETAR */}
            <TouchableOpacity
              onPress={handleDelete}
              style={{
                flex: 1,

                backgroundColor: colors.surface,

                borderWidth: 1,
                borderColor: colors.danger,

                borderRadius: 14,

                paddingVertical: 14,

                alignItems: "center",
                justifyContent: "center",

                flexDirection: "row",

                gap: 10,
              }}
            >
              <Ionicons name="trash-outline" size={18} color={colors.danger} />

              <Text
                style={{
                  color: colors.danger,
                  fontWeight: "bold",
                }}
              >
                Deletar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* MODAL */}
      <Modal visible={isViewerOpen} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
          }}
        >
          <ImageViewer
            imageUrls={images.map((img) => ({
              url: img,
            }))}
            index={selectedIndex}
            onChange={(index) => setSelectedIndex(index ?? 0)}
            enableImageZoom={false}
            saveToLocalByLongPress={false}
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
                  }}
                  resizeMode="contain"
                />
              </View>
            )}
          />

          {/* FECHAR */}
          <TouchableOpacity
            onPress={() => setIsViewerOpen(false)}
            style={{
              position: "absolute",

              top: 50,
              right: 20,

              zIndex: 10,

              backgroundColor: "rgba(255,255,255,0.15)",

              paddingHorizontal: 14,
              paddingVertical: 10,

              borderRadius: 999,

              flexDirection: "row",

              alignItems: "center",

              gap: 8,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              FECHAR ✕
            </Text>
          </TouchableOpacity>

          {/* DOWNLOAD */}
          <TouchableOpacity
            onPress={() => downloadImage(images[selectedIndex])}
            style={{
              position: "absolute",

              top: 50,
              left: 20,

              zIndex: 10,

              backgroundColor: "rgba(255,255,255,0.15)",

              paddingHorizontal: 14,
              paddingVertical: 10,

              borderRadius: 999,

              flexDirection: "row",

              alignItems: "center",

              gap: 8,
            }}
          >
            <Ionicons name="download-outline" size={18} color="#fff" />

            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              BAIXAR
            </Text>
          </TouchableOpacity>

          {/* ESQUERDA */}
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
              <Ionicons name="arrow-back-circle" size={42} color="#fff" />
            </TouchableOpacity>
          )}

          {/* DIREITA */}
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
              <Ionicons name="arrow-forward-circle" size={42} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </>
  );
}
