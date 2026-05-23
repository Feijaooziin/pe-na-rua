import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import ImagePickerPreview from "@/src/components/ImagePickerPreview";
import { categories } from "@/src/constants/categories";
import { getTreeById, updateTree } from "@/src/database/trees";
import { useSettings } from "@/src/hooks/useSettings";
import { colors } from "@/src/theme/colors";
import { Tree } from "@/src/types/tree";
import { chooseImage } from "@/src/utils/imagePicker";
import { Picker } from "@react-native-picker/picker";

export default function Edit() {
  const { id } = useLocalSearchParams();
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
        setCategory(data.category ?? "");
      }
    }
  }, [id]);

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
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

    alert("Atualizado 🌳");
    router.back();
  }

  if (!tree) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* IMAGEM PRINCIPAL */}
      {images.length > 0 ? (
        <Image
          source={{ uri: images[0] }}
          style={{
            width: "100%",
            height: 220,
            borderRadius: 32,
            marginBottom: 12,
            marginTop: 6,
          }}
        />
      ) : (
        <View
          style={{
            height: 220,
            backgroundColor: "#ccc",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 12,
            marginBottom: 10,
          }}
        >
          <Text>Sem imagem</Text>
        </View>
      )}

      {/* LISTA DE IMAGENS */}
      <ImagePickerPreview
        images={images}
        onRemove={removeImage}
        onSetMain={setAsMain}
      />

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
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 15,
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <Text style={{ color: colors.primary }}>Adicionar imagens 📸</Text>
      </TouchableOpacity>

      <Text
        style={{
          marginTop: 6,
          marginBottom: 6,
          fontSize: 16,
          textAlign: "center",
          color: isLimitReached ? colors.danger : "#666",
          fontWeight: isLimitReached ? "bold" : "normal",
        }}
      >
        {images.length} / {maxImages} imagens usadas
      </Text>

      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: colors.text,
          }}
        >
          Editar árvore 🌳
        </Text>

        {/* INPUT NOME */}
        <Text style={{ marginTop: 15, fontWeight: "bold" }}>Nome</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Ex: Mangueira"
          placeholderTextColor={"#000"}
          style={{
            marginTop: 5,
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 10,
            padding: 12,
            backgroundColor: "#fff",
          }}
        />

        {/* INPUT DESCRIÇÃO */}
        <Text style={{ marginTop: 15, fontWeight: "bold" }}>Descrição</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Detalhes sobre a árvore..."
          placeholderTextColor={"#000"}
          multiline
          style={{
            marginTop: 5,
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 10,
            padding: 12,
            backgroundColor: "#fff",
            minHeight: 100,
            textAlignVertical: "top",
          }}
        />

        <Text style={{ marginTop: 15, fontWeight: "bold" }}>Categoria</Text>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            marginTop: 5,
            overflow: "hidden",
          }}
        >
          <Picker
            style={{ color: colors.text }}
            dropdownIconColor={colors.text}
            selectedValue={category}
            onValueChange={(value) => setCategory(value)}
          >
            {categories.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>

        {/* BOTÃO SALVAR */}
        <TouchableOpacity
          onPress={handleUpdate}
          style={{
            marginTop: 20,
            backgroundColor: colors.primary,
            padding: 15,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Salvar alterações
          </Text>
        </TouchableOpacity>

        {/* BOTÃO VOLTAR */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: 10,
            padding: 15,
            borderRadius: 12,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            backgroundColor: colors.danger,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
