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
import { FINAL } from "@/src/constants/layout";
import { insertTree } from "@/src/database/trees";
import { useSettings } from "@/src/hooks/useSettings";
import { useTheme } from "@/src/hooks/useTheme";
import { chooseImage } from "@/src/utils/imagePicker";

export default function Create() {
  const { settings, loading } = useSettings();
  const { colors } = useTheme();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [category, setCategory] = useState("tree");
  const [images, setImages] = useState<string[]>([]);

  const maxImages = settings?.maxImages ?? 10;

  const isLimitReached = images.length >= maxImages;

  useEffect(() => {
    (async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (!granted) {
        Alert.alert("Atenção!", "Permita acesso à localização 📍");
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

  async function getLocation() {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) {
      Alert.alert("Atenção!", "Permissão negada");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});

    setLatitude(loc.coords.latitude);
    setLongitude(loc.coords.longitude);
  }

  function handleCreate() {
    if (!name.trim()) {
      Alert.alert("Atenção!", "Digite um nome");
      return;
    }

    if (latitude === null || longitude === null) {
      Alert.alert("Atenção!", "Aguarde a localização 📍");
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

    Alert.alert("Sucesso", "Árvore cadastrada 🌳");

    router.back();
  }

  if (loading || !settings) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: "center",
          alignItems: "center",
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
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Header />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: FINAL,
        }}
      >
        {/* TÍTULO */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: colors.text,
            marginBottom: 20,
          }}
        >
          Nova árvore 🌱
        </Text>

        {/* NOME */}
        <Text
          style={{
            marginBottom: 6,
            color: colors.text,
            fontWeight: "600",
          }}
        >
          Nome
        </Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Ex: Ipê amarelo"
          placeholderTextColor={colors.textMuted}
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 14,
            marginBottom: 16,

            borderWidth: 1,
            borderColor: colors.border,

            color: colors.text,
          }}
        />

        {/* DESCRIÇÃO */}
        <Text
          style={{
            marginBottom: 6,
            color: colors.text,
            fontWeight: "600",
          }}
        >
          Descrição
        </Text>

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Detalhes da árvore..."
          placeholderTextColor={colors.textMuted}
          multiline
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 14,
            height: 110,
            textAlignVertical: "top",
            marginBottom: 16,

            borderWidth: 1,
            borderColor: colors.border,

            color: colors.text,
          }}
        />

        {/* CATEGORIA */}
        <Text
          style={{
            marginBottom: 6,
            color: colors.text,
            fontWeight: "600",
          }}
        >
          Categoria
        </Text>

        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            marginBottom: 16,
            overflow: "hidden",

            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Picker
            style={{
              color: colors.text,
            }}
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

        {/* IMAGENS */}
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
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 15,
            alignItems: "center",
            marginBottom: 8,

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

        <Text
          style={{
            marginBottom: 16,
            fontSize: 15,
            textAlign: "center",
            color: isLimitReached ? colors.danger : colors.textSecondary,

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

        {/* LOCALIZAÇÃO */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 14,
            padding: 14,
            marginTop: 16,
            marginBottom: 16,

            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            {latitude && longitude
              ? `📍 ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
              : "Pegando localização..."}
          </Text>
        </View>

        <TouchableOpacity
          onPress={getLocation}
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 15,
            alignItems: "center",
            marginBottom: 18,

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
            Atualizar localização
          </Text>
        </TouchableOpacity>

        {/* SALVAR */}
        <TouchableOpacity
          onPress={handleCreate}
          style={{
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
            Salvar árvore
          </Text>
        </TouchableOpacity>

        {/* CANCELAR */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: 12,
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
      </ScrollView>
    </View>
  );
}
