import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { router } from "expo-router";
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

import Header from "@/src/components/Header";
import { insertTree } from "@/src/database/trees";
import { useSettings } from "@/src/hooks/useSettings";
import { colors } from "@/src/theme/colors";

export default function Create() {
  const { settings, loading } = useSettings();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const maxImages = settings?.maxImages ?? 10;
  const isLimitReached = images.length >= maxImages;

  useEffect(() => {
    (async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (!granted) {
        alert("Permita acesso à localização 📍");
        return;
      }

      try {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setLatitude(loc.coords.latitude);
        setLongitude(loc.coords.longitude);
      } catch (err) {
        console.log("Erro ao pegar localização", err);
      }
    })();
  }, []);

  function addImage(uri: string) {
    if (images.length >= (settings?.maxImages ?? 10)) {
      alert("Limite de imagens atingido 📸");
      return;
    }

    setImages((prev) => [...prev, uri]);
  }

  function removeImage(index: number) {
    Alert.alert("Remover imagem?", "Deseja excluir essa foto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => {
          setImages((prev) => prev.filter((_, i) => i !== index));
        },
      },
    ]);
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      alert("Permissão da câmera negada");
      return;
    }

    if (settings && images.length >= settings.maxImages) {
      alert(`Limite de ${settings.maxImages} imagens atingido`);
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!result.canceled) {
      addImage(result.assets[0].uri);
    }
  }

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
      selectionLimit: settings?.maxImages,
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

  function chooseImage() {
    Alert.alert("Selecionar imagem", "Escolha uma opção", [
      { text: "Cancelar", style: "cancel" },
      { text: "Câmera", onPress: takePhoto },
      { text: "Galeria", onPress: pickImage },
    ]);
  }

  function setAsMain(index: number) {
    setImages((prev) => {
      const selected = prev[index];
      const rest = prev.filter((_, i) => i !== index);
      return [selected, ...rest];
    });
  }

  async function getLocation() {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) {
      alert("Permissão negada");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});

    setLatitude(loc.coords.latitude);
    setLongitude(loc.coords.longitude);
  }

  function handleCreate() {
    if (!name.trim()) {
      alert("Digite um nome");
      return;
    }

    if (latitude === null || longitude === null) {
      alert("Aguarde a localização 📍");
      return;
    }

    insertTree({
      name,
      description,
      images,
      latitude,
      longitude,
      created_at: new Date().toISOString(),
    });

    alert("Árvore cadastrada 🌳");
    router.back();
    console.log("LAT:", latitude);
    console.log("LNG:", longitude);
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
          placeholderTextColor={"#000"}
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
          placeholderTextColor={"#000"}
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
          onPress={chooseImage}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 15,
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Text style={{ color: colors.primary }}>Adicionar imagens - 📸</Text>
        </TouchableOpacity>
        <Text
          style={{
            marginBottom: 15,
            fontSize: 16,
            textAlign: "center",
            color: isLimitReached ? colors.danger : "#666",
            fontWeight: isLimitReached ? "bold" : "normal",
          }}
        >
          {images.length} / {maxImages} imagens usadas
        </Text>

        {images.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
          >
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
                <TouchableOpacity
                  onPress={() => setAsMain(index)}
                  style={{
                    position: "absolute",
                    right: 0,
                    backgroundColor: colors.primary,
                    borderRadius: 100,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 8, fontWeight: "bold" }}
                  >
                    TORNAR
                  </Text>
                  <Text
                    style={{ color: "#fff", fontSize: 8, fontWeight: "bold" }}
                  >
                    PRINCIPAL
                  </Text>
                </TouchableOpacity>
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
                  <Text
                    style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}
                  >
                    ✕
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        <Text style={{ color: "#555", marginBottom: 16, fontSize: 24 }}>
          {latitude && longitude
            ? `📍 ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
            : "Pegando localização..."}
        </Text>

        <TouchableOpacity
          onPress={getLocation}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 15,
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ color: colors.primary }}>Atualizar localização</Text>
        </TouchableOpacity>

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
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
