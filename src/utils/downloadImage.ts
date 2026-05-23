import * as FileSystem from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";

export async function downloadImage(uri: string) {
  try {
    const permission = await MediaLibrary.requestPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permissão negada");
      return;
    }

    const fileUri = FileSystem.cacheDirectory + `tree-${Date.now()}.jpg`;

    await FileSystem.copyAsync({
      from: uri,
      to: fileUri,
    });

    const asset = await MediaLibrary.createAssetAsync(fileUri);

    await MediaLibrary.createAlbumAsync("Pé na Rua", asset, false);

    Alert.alert("Imagem salva ✅", "A imagem foi salva na galeria.");
  } catch (error) {
    console.log(error);

    Alert.alert("Erro", "Não foi possível salvar a imagem.");
  }
}
