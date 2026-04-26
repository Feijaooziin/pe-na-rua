import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Header from "@/src/components/Header";
import { insertTree } from "@/src/database/trees";
import { colors } from "@/src/theme/colors";

export default function Create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);

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

  function handleCreate() {
    if (!name.trim()) {
      alert("Digite um nome");
      return;
    }

    insertTree({
      name,
      description,
      image: image ?? undefined,
      latitude: undefined,
      longitude: undefined,
      created_at: new Date().toISOString(),
    });

    alert("Árvore cadastrada 🌳");

    router.back();
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Título */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: colors.text,
            marginBottom: 20,
          }}
        >
          Nova árvore 🌱
        </Text>

        {/* Nome */}
        <Text style={{ marginBottom: 5, color: colors.text }}>Nome</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Ex: Ipê amarelo"
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 12,
            marginBottom: 15,
          }}
        />

        {/* Descrição */}
        <Text style={{ marginBottom: 5, color: colors.text }}>Descrição</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Detalhes da árvore..."
          multiline
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 12,
            height: 100,
            textAlignVertical: "top",
            marginBottom: 15,
          }}
        />

        {/* Imagem */}
        <TouchableOpacity
          onPress={pickImage}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 15,
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ color: colors.primary }}>Selecionar imagem 📸</Text>
        </TouchableOpacity>

        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 12,
              marginBottom: 20,
            }}
          />
        )}

        {/* Botão */}
        <TouchableOpacity
          onPress={handleCreate}
          style={{
            backgroundColor: colors.primary,
            padding: 15,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Salvar 🌳</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
