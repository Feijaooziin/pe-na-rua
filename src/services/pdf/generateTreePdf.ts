import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import { Tree } from "@/src/types/tree";
import { getCategoryLabel } from "@/src/utils/category";
import { formatDate } from "@/src/utils/date";
import { Alert } from "react-native";

export async function generateTreePdf(tree: Tree) {
  async function imageToBase64(uri: string) {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });

    return `data:image/jpeg;base64,${base64}`;
  }

  const mapsUrl = `https://www.google.com/maps?q=${tree.latitude},${tree.longitude}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    mapsUrl,
  )}`;

  const imagesHtml = tree.images?.length
    ? `
    <div style="
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
      margin-bottom: 24px;
    ">
      ${(
        await Promise.all(
          tree.images.map(async (img) => {
            try {
              const base64 = await imageToBase64(img);

              return `
                <img src="${base64}" style="
                  width: 150px;
                  height: 150px;
                  object-fit: cover;
                  border-radius: 8px;
                  border: 1px solid #ddd;
                "/>
              `;
            } catch {
              return `
                <div style="
                  height: 150px;
                  background: #f0f0f0;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 10px;
                  color: #777;
                  border: 1px solid #ddd;
                ">
                  Sem imagem
                </div>
              `;
            }
          }),
        )
      ).join("")}
    </div>
  `
    : `
    <div style="
      padding: 20px;
      background: #f3f3f3;
      border-radius: 12px;
      text-align: center;
      color: #666;
    ">
      Sem imagens cadastradas
    </div>
  `;

  const html = `
<html>
  <body style="
    font-family: Arial, sans-serif;
    padding: 32px;
    color: #1a1a1a;
    background: #fff;
  ">

    <!-- CAPA -->
    <div style="
      border-bottom: 2px solid #2e7d32;
      padding-bottom: 16px;
      margin-bottom: 24px;
    ">
      <h1 style="
        margin: 0;
        font-size: 26px;
      ">
        🌳 Informações sobre a Árvore/Planta
      </h1>
    </div>

    <!-- NOME + CATEGORIA -->
    <h2 style="margin-bottom: 4px;">
      ${tree.name}
    </h2>

    <p style="
      margin-top: 0;
      color: #2e7d32;
      font-weight: bold;
    ">
      ${getCategoryLabel(tree.category)}
    </p>

    <!-- IMAGENS -->
    <h3 style="margin-top: 24px;">Registro Fotográfico</h3>

    ${imagesHtml}

    <!-- DESCRIÇÃO -->
    <h3>Descrição</h3>

    <div style="
      background: #f7f7f7;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 20px;
      font-size: 14px;
      line-height: 1.5;
    ">
      ${tree.description || "Sem descrição cadastrada."}
    </div>

    <!-- DADOS -->
    <h3>Dados de Localização</h3>

    <div style="
      gap: 12px;
      margin-bottom: 20px;
      font-size: 14px;
    ">

      <div style="background:#fafafa;padding:10px;border-radius:8px;">
        <strong>Latitude</strong><br/>
        ${tree.latitude}
      </div>

      <div style="background:#fafafa;padding:10px;border-radius:8px;">
        <strong>Longitude</strong><br/>
        ${tree.longitude}
      </div>

    </div>

    <!-- QR CODE -->
    <h3>Localização no Mapa</h3>

    <div style="
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
    ">

      <img src="${qrCodeUrl}" style="
        width: 120px;
        height: 120px;
        border: 1px solid #ddd;
        border-radius: 8px;
      "/>

      <div style="font-size: 13px; color: #555;">
        Escaneie para abrir a localização no Google Maps.<br/>
        <span style="color:#888;">Uso para inspeção e validação em campo.</span>
      </div>

    </div>

    <!-- DATA -->
    <h3>Registro</h3>

    <p style="font-size: 14px;">
      Data de cadastro:
      <strong>${formatDate(tree.created_at)}</strong>
    </p>

    <!-- RODAPÉ -->
    <div style="
      margin-top: 40px;
      font-size: 11px;
      color: #999;
      border-top: 1px solid #eee;
      padding-top: 10px;
    ">
      Documento gerado automaticamente pelo app Pé na Rua®.
    </div>

  </body>
</html>
`;

  const file = await Print.printToFileAsync({
    html,
  });

  await Sharing.shareAsync(file.uri);
  Alert.alert("PDF exportado 📄", "O PDF da árvore foi gerado com sucesso.");
}
