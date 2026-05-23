import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import Header from "@/src/components/Header";
import ImagePickerPreview from "@/src/components/ImagePickerPreview";
import { categories } from "@/src/constants/categories";
import { insertTree } from "@/src/database/trees";
import { useSettings } from "@/src/hooks/useSettings";
import { colors } from "@/src/theme/colors";
import { chooseImage } from "@/src/utils/imagePicker";

export default function Create() {
  const { settings, loading } = useSettings();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [category, setCategory] = useState("tree");
  const [images, setImages] = useState<string[]>([]);
  const maxImages = settings?.maxImages ?? 10;
  const isLimitReached = images.length >= maxImages;
  const remainingImages = maxImages - images.length;

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
      category,
      created_at: new Date().toISOString(),
    });

    alert("Árvore cadastrada 🌳");
    router.back();
    console.log("NOME:", name);
    console.log("DESC:", description);
    console.log("LAT:", latitude);
    console.log("LNG:", longitude);
    console.log("CAT:", category);
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

        {/* CATEGORIA */}
        <Text style={{ marginBottom: 5, color: colors.text }}>Categoria</Text>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            marginBottom: 15,
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

        {/* Imagem */}
        <TouchableOpacity
          onPress={() =>
            chooseImage({
              currentImages: images,
              maxImages,
              allowCamera: true,
              onImagesSelected: (newImages) =>
                setImages((prev) => [...prev, ...newImages]),
            })
          }
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

        <ImagePickerPreview
          images={images}
          onRemove={removeImage}
          onSetMain={setAsMain}
        />

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

        {/* Botão Salvar */}
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

        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: 10,
            padding: 15,
            borderRadius: 12,
            alignItems: "center",
            borderWidth: 1,
            borderColor: colors.danger,
          }}
        >
          <Text
            style={{
              color: colors.danger,
              fontWeight: "bold",
            }}
          >
            Cancelar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
