import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import ImagePickerPreview from "@/src/components/ImagePickerPreview";

import { categories } from "@/src/constants/categories";
import { FINAL } from "@/src/constants/layout";

import { getTreeById, updateTree } from "@/src/database/trees";

import { useSettings } from "@/src/hooks/useSettings";
import { useTheme } from "@/src/hooks/useTheme";

import { Tree } from "@/src/types/tree";

import PickerItem from "@/src/components/itens/PickerItem";
import { Section } from "@/src/components/itens/Section";
import { chooseImage } from "@/src/utils/imagePicker";

export default function Edit() {
  const { id } = useLocalSearchParams();

  const { colors, isDark } = useTheme();

  const { settings } = useSettings();

  const [tree, setTree] = useState<Tree | null>(null);

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [images, setImages] = useState<string[]>([]);

  const [category, setCategory] = useState("tree");

  const maxImages = settings?.maxImages ?? 10;

  const isLimitReached = images.length >= maxImages;

  const remainingImages = maxImages - images.length;

  useEffect(() => {
    if (id) {
      const data = getTreeById(Number(id));

      if (data) {
        setTree(data);

        setName(data.name);

        setDescription(data.description);

        setImages(data.images ?? []);

        setCategory(data.category ?? "tree");
      }
    }
  }, [id]);

  function removeImage(index: number) {
    Alert.alert("Remover imagem", "Deseja excluir essa foto?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => {
          setImages((prev) => prev.filter((_, i) => i !== index));
        },
      },
    ]);
  }

  function setAsMain(index: number) {
    setImages((prev) => {
      const selected = prev[index];

      const rest = prev.filter((_, i) => i !== index);

      return [selected, ...rest];
    });
  }

  function handleUpdate() {
    if (!tree || !tree.id) return;

    updateTree({
      ...tree,
      name,
      description,
      images,
      category,
    });

    Alert.alert("Sucesso 🌳", "Árvore atualizada com sucesso!");

    router.back();
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
      {/* IMAGEM PRINCIPAL */}
      {images.length > 0 ? (
        <Image
          source={{ uri: images[0] }}
          style={{
            width: "100%",
            height: 240,

            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,

            marginBottom: 12,
          }}
        />
      ) : (
        <View
          style={{
            height: 220,

            backgroundColor: colors.surface,

            justifyContent: "center",
            alignItems: "center",

            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,

            marginBottom: 12,
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

      {/* PREVIEW */}
      <ImagePickerPreview
        images={images}
        onRemove={removeImage}
        onSetMain={setAsMain}
      />

      {/* ADICIONAR IMAGEM */}
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            chooseImage({
              currentImages: images,

              maxImages,

              allowCamera: false,

              onImagesSelected: (newImages) =>
                setImages((prev) => [...prev, ...newImages]),
            })
          }
          style={{
            backgroundColor: colors.surface,

            borderRadius: 14,

            padding: 16,

            alignItems: "center",

            marginTop: 18,

            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontWeight: "600",
            }}
          >
            Adicionar imagens 📸
          </Text>
        </TouchableOpacity>

        {/* CONTADOR */}
        <Text
          style={{
            marginTop: 10,
            marginBottom: 4,

            fontSize: 14,

            textAlign: "center",

            color: isLimitReached ? colors.danger : colors.textSecondary,

            fontWeight: isLimitReached ? "bold" : "normal",
          }}
        >
          {images.length} / {maxImages} imagens usadas
        </Text>

        {!isLimitReached && (
          <Text
            style={{
              textAlign: "center",

              fontSize: 12,

              color: colors.textMuted,
            }}
          >
            Você ainda pode adicionar {remainingImages} imagem(ns)
          </Text>
        )}

        {/* TÍTULO */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",

            color: colors.text,

            marginTop: 28,
            marginBottom: 10,
          }}
        >
          Editar árvore 🌳
        </Text>

        {/* INPUT NOME */}
        <Section title="nome">
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Ex: Mangueira"
            placeholderTextColor={colors.textMuted}
            style={{
              padding: 14,
              backgroundColor: colors.input,
              color: colors.text,
            }}
          />
        </Section>

        {/* INPUT DESCRIÇÃO */}
        <Section title="Descrição">
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Detalhes sobre a árvore..."
            placeholderTextColor={colors.textMuted}
            multiline
            style={{
              padding: 14,
              backgroundColor: colors.input,
              color: colors.text,
              minHeight: 120,
              textAlignVertical: "top",
            }}
          />
        </Section>

        {/* CATEGORIA */}
        <Section title="Categoria">
          <PickerItem
            label="Selecione a Categoria"
            value={category}
            onChange={setCategory}
            items={categories}
          />
        </Section>

        <View style={{ marginTop: -36 }}>
          <Section title="">
            {/* BOTÃO SALVAR */}
            <TouchableOpacity
              onPress={handleUpdate}
              style={{
                marginTop: 12,
                marginHorizontal: 12,
                backgroundColor: colors.primary,
                padding: 16,
                borderRadius: 14,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                Salvar alterações
              </Text>
            </TouchableOpacity>

            {/* CANCELAR */}
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                margin: 12,
                padding: 16,
                borderRadius: 14,
                alignItems: "center",

                backgroundColor: colors.surface,

                borderWidth: 1,
                borderColor: colors.danger,
              }}
            >
              <Text
                style={{
                  color: colors.danger,
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          </Section>
        </View>
      </View>
    </ScrollView>
  );
}
