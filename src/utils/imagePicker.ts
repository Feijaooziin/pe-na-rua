import { setCameraData } from "@/src/store/camera";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Alert } from "react-native";

type PickImagesParams = {
  currentImages: string[];
  maxImages: number;
  onImagesSelected: (images: string[]) => void;
  allowCamera?: boolean;
};

export async function takePhoto({
  currentImages,
  maxImages,
  onImagesSelected,
}: PickImagesParams) {
  if (currentImages.length >= maxImages) {
    alert(`Limite de ${maxImages} imagens atingido`);
    return;
  }

  // setCameraCallback((photos) => {
  //   onImagesSelected(photos);
  // });

  setCameraData({
    currentImages,
    maxImages,
    callback: onImagesSelected,
  });

  router.push("/camera");
}

export async function pickImages({
  currentImages,
  maxImages,
  onImagesSelected,
}: PickImagesParams) {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    alert("Permissão negada");
    return;
  }

  if (currentImages.length >= maxImages) {
    alert(`Limite de ${maxImages} imagens atingido`);
    return;
  }

  const remainingImages = maxImages - currentImages.length;

  const result = await ImagePicker.launchImageLibraryAsync({
    quality: 0.7,
    allowsMultipleSelection: true,
    selectionLimit: remainingImages,
  });

  if (!result.canceled) {
    const uris = result.assets.map((asset) => asset.uri);

    const total = currentImages.length + uris.length;

    if (total > maxImages) {
      alert(`Você pode adicionar no máximo ${maxImages} imagens`);
      return;
    }

    onImagesSelected(uris);
  }
}

export function chooseImage({
  allowCamera = false,
  ...props
}: PickImagesParams) {
  const options: any[] = [
    {
      text: "Cancelar",
      style: "cancel",
    },
  ];

  if (allowCamera) {
    options.push({
      text: "Câmera",
      onPress: () => takePhoto(props),
    });
  }

  options.push({
    text: "Galeria",
    onPress: () => pickImages(props),
  });

  Alert.alert("Selecionar imagem", "Escolha uma opção", options);
}
