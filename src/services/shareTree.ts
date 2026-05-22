import * as FileSystem from "expo-file-system/legacy";
import Share from "react-native-share";

import { Tree } from "@/src/types/tree";

type ShareSettings = {
  includeMaps?: boolean;
  shareText?: string;
};

export async function shareTree(tree: Tree, settings?: ShareSettings) {
  try {
    let imageUrl: string | undefined;

    const firstImage = tree.images?.[0];

    // 📸 copiar imagem para cache compartilhável
    if (firstImage) {
      const newPath = FileSystem.cacheDirectory + `share-${Date.now()}.png`;

      await FileSystem.copyAsync({
        from: firstImage,
        to: newPath,
      });

      imageUrl = newPath;
    }

    const mapsLink =
      tree.latitude && tree.longitude
        ? `https://www.google.com/maps?q=${tree.latitude},${tree.longitude}`
        : "";

    const mapSection =
      settings?.includeMaps && mapsLink
        ? `*Localização no mapa📍*
${mapsLink}`
        : "";

    const message = `*${tree.name}*


${tree.description || ""}


${mapSection}


${settings?.shareText || ""}`;

    // 📤 compartilhar
    if (imageUrl) {
      await Share.open({
        title: tree.name,
        message,
        url: imageUrl,
        type: "image/png",
        failOnCancel: false,
      });
    } else {
      await Share.open({
        title: tree.name,
        message,
        failOnCancel: false,
      });
    }
  } catch (error) {
    console.log("Erro compartilhar:", error);
  }
}
