import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

import { getTrees, insertTree } from "@/src/database/trees";

export async function exportTrees() {
  try {
    // 🌳 pegar árvores
    const trees = getTrees();

    // 📸 converter imagens para base64
    const formattedTrees = await Promise.all(
      trees.map(async ({ id, images, ...tree }) => {
        const convertedImages = await Promise.all(
          (images || []).map(async (uri: string) => {
            try {
              // 📄 ler arquivo da imagem
              const base64 = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
              });

              // 🖼️ descobrir extensão
              const extension = uri.split(".").pop()?.toLowerCase() || "jpg";

              // 🔥 gerar data URI
              return `data:image/${extension};base64,${base64}`;
            } catch (error) {
              console.log("Erro ao converter imagem:", error);

              return null;
            }
          }),
        );

        return {
          ...tree,
          images: convertedImages.filter(Boolean),
        };
      }),
    );

    // 📄 converter para JSON
    const json = JSON.stringify(formattedTrees, null, 2);

    // 📁 caminho do arquivo
    const fileUri = FileSystem.documentDirectory + "pe-na-rua-backup.json";

    // 💾 salvar arquivo
    await FileSystem.writeAsStringAsync(fileUri, json, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // 📤 compartilhar arquivo
    await Sharing.shareAsync(fileUri);

    console.log("Backup exportado:", fileUri);
  } catch (error) {
    console.log("Erro ao exportar backup", error);
  }
}

export async function importTrees() {
  try {
    // 📂 selecionar arquivo
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/json",
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    // 📄 URI do arquivo
    const fileUri = result.assets[0].uri;

    // 📖 ler JSON
    const content = await FileSystem.readAsStringAsync(fileUri);

    const trees = JSON.parse(content);

    // 🌳 importar árvores
    for (const tree of trees) {
      const restoredImages: string[] = [];

      // 📸 recriar imagens
      for (const image of tree.images || []) {
        try {
          if (!image.startsWith("data:image")) continue;

          // separar base64
          const parts = image.split(",");

          const metadata = parts[0];
          const base64 = parts[1];

          // descobrir extensão
          const extension =
            metadata.match(/data:image\/(.*);base64/)?.[1] || "jpg";

          // gerar nome único
          const fileName = `tree-${Date.now()}-${Math.random()
            .toString(36)
            .substring(7)}.${extension}`;

          // caminho novo
          const imageUri = FileSystem.documentDirectory + fileName;

          // salvar imagem
          await FileSystem.writeAsStringAsync(imageUri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });

          restoredImages.push(imageUri);
        } catch (error) {
          console.log("Erro ao restaurar imagem", error);
        }
      }

      // 💾 salvar árvore
      insertTree({
        name: tree.name,
        description: tree.description,
        category: tree.category,
        favorite: tree.favorite,
        latitude: tree.latitude,
        longitude: tree.longitude,
        created_at: tree.created_at,
        images: restoredImages,
      });
    }

    console.log("Backup importado com sucesso");
  } catch (error) {
    console.log("Erro ao importar backup", error);
  }
}
