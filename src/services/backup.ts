// import * as FileSystem from "expo-file-system/legacy";
// import * as Sharing from "expo-sharing";

// import { getTrees } from "@/src/database/trees";

// export async function exportTrees() {
//   try {
//     // 🌳 pegar árvores
//     const trees = getTrees();

//     // 🧹 remover IDs
//     const cleanTrees = trees.map(({ id, ...rest }) => rest);

//     // 📄 converter para JSON
//     const json = JSON.stringify(cleanTrees, null, 2);

//     // 📁 caminho do arquivo
//     const fileUri = FileSystem.documentDirectory + "pe-na-rua-backup.json";

//     // 💾 salvar arquivo
//     await FileSystem.writeAsStringAsync(fileUri, json, {
//       encoding: FileSystem.EncodingType.UTF8,
//     });

//     // 📤 compartilhar arquivo
//     await Sharing.shareAsync(fileUri);

//     console.log("Backup exportado:", fileUri);
//   } catch (error) {
//     console.log("Erro ao exportar backup", error);
//   }
// }

import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

import { getTrees } from "@/src/database/trees";

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
