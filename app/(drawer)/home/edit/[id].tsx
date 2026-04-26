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
import { colors } from "@/src/theme/colors";
import { Tree } from "@/src/types/tree";

export default function Edit() {
  const { id } = useLocalSearchParams();

  const [tree, setTree] = useState<Tree | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const data = getTreeById(Number(id));

      if (data) {
        setTree(data);
        setName(data.name);
        setDescription(data.description);
        setImage(data.image ?? null);
      }
    }
  }, [id]);

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permissão negada");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  function handleUpdate() {
    if (!tree || !tree.id) return;

    updateTree({
      ...tree,
      name,
      description,
      image: image ?? undefined,
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
      {/* IMAGEM */}
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: 220,
            }}
          />
        ) : (
          <View
            style={{
              height: 220,
              backgroundColor: "#ccc",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Adicionar imagem</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={{ padding: 20 }}>
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
          style={{
            marginTop: 5,
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 10,
            padding: 12,
            backgroundColor: "#fff",
            color: "#000",
          }}
        />

        {/* INPUT DESCRIÇÃO */}
        <Text style={{ marginTop: 15, fontWeight: "bold" }}>Descrição</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Detalhes sobre a árvore..."
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
            color: "#000",
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
