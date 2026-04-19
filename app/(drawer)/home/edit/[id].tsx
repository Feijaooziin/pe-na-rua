import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Image, Text, TextInput, View } from "react-native";

import { getTreeById, updateTree } from "@/src/database/trees";
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
    if (!tree) return;

    updateTree({
      ...tree,
      name,
      description,
      image: image ?? undefined,
    });

    alert("Atualizado 🌳");

    router.back();
  }

  if (!tree) return <Text>Carregando...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Editar árvore</Text>

      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={{ marginTop: 10 }}
      />

      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        style={{ marginTop: 10 }}
      />

      <Button title="Trocar imagem" onPress={pickImage} />

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginTop: 10 }}
        />
      )}

      <Button title="Salvar alterações" onPress={handleUpdate} />
    </View>
  );
}
