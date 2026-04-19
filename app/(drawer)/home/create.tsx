import { insertTree } from "@/src/database/trees";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState } from "react";
import { Button, Image, Text, TextInput, View } from "react-native";

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
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function handleCreate() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permissão negada");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    insertTree({
      name,
      description,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      image: image ?? undefined,
    });

    alert("Salvo 🌳");

    router.back();
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Nova árvore</Text>

      <TextInput placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Escolher imagem" onPress={pickImage} />

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginTop: 10 }}
        />
      )}

      <Button title="Salvar" onPress={handleCreate} />
    </View>
  );
}
