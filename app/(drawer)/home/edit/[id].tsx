import * as ImagePicker from "expo-image-picker";
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

import { getTreeById, updateTree } from "@/src/database/trees";
import { useSettings } from "@/src/hooks/useSettings";
import { colors } from "@/src/theme/colors";
import { Tree } from "@/src/types/tree";

export default function Edit() {
  const { id } = useLocalSearchParams();
  const { settings } = useSettings();

  const [tree, setTree] = useState<Tree | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
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
      }
    }
  }, [id]);

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permissão negada");
      return;
    }

    if (settings && images.length >= settings.maxImages) {
      alert(`Limite de ${settings.maxImages} imagens atingido`);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.7,
      allowsMultipleSelection: true,
      selectionLimit: remainingImages,
    });

    if (!result.canceled && settings) {
      const uris = result.assets.map((asset) => asset.uri);

      const total = images.length + uris.length;

      if (total > settings.maxImages) {
        alert(`Você pode adicionar no máximo ${settings.maxImages} imagens`);
        return;
      }

      setImages((prev) => [...prev, ...uris]);
    }
  }

  function addImage(uri: string) {
    if (images.length >= maxImages) {
      alert("Limite de imagens atingido 📸");
      return;
    }

    setImages((prev) => [...prev, uri]);
  }

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
      {images.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {images.map((img, index) => (
            <View key={index} style={{ marginLeft: 5 }}>
              <Image
                source={{ uri: img }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              />

              {/* PRINCIPAL */}
              <TouchableOpacity
                onPress={() => setAsMain(index)}
                style={{
                  position: "absolute",
                  right: 0,
                  backgroundColor: colors.primary,
                  borderRadius: 100,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 8 }}>PRINCIPAL</Text>
              </TouchableOpacity>

              {/* REMOVER */}
              <TouchableOpacity
                onPress={() => removeImage(index)}
                style={{
                  position: "absolute",
                  left: -5,
                  backgroundColor: colors.danger,
                  borderRadius: 100,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        onPress={pickImage}
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
