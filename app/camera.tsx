import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView, FlashMode } from "expo-camera";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { getCameraData } from "@/src/store/camera";

export default function CameraScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [zoom, setZoom] = useState(0);

  const cameraData = getCameraData();
  const existingImages = cameraData?.currentImages || [];
  const isExistingImage = selectedIndex < existingImages.length;
  const MAX_IMAGES = cameraData?.maxImages || 5;
  const [photos, setPhotos] = useState<string[]>([]);
  const totalPhotos = [...existingImages, ...photos];
  const galleryPhotos = [...existingImages, ...photos];

  async function takePicture() {
    try {
      if (totalPhotos.length >= MAX_IMAGES) {
        return;
      }

      const photo = await cameraRef.current?.takePictureAsync({
        quality: 0.7,
      });

      if (!photo) return;

      setPhotos((prev) => {
        const updated = [...prev, photo.uri];

        // abre preview automaticamente
        if (existingImages.length + updated.length >= MAX_IMAGES) {
          setSelectedIndex(updated.length - 1);
          setGalleryOpen(true);
        }

        return updated;
      });
    } catch (error) {
      console.log(error);
    }
  }

  function toggleCamera() {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
    setFlash("off");
  }

  function toggleFlash() {
    setFlash((prev) => (prev === "off" ? "on" : "off"));
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing={facing}
        flash={flash}
        zoom={zoom}
      />
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        {/* OVERLAY CIMA */}
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: 120,
            backgroundColor: "#000",
          }}
        />
        {/* TOPO */}
        <View
          style={{
            position: "absolute",
            top: 60,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 25,
          }}
        >
          {/* FECHAR */}
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={34} color="#fff" />
          </TouchableOpacity>

          {/* FLASH */}
          {facing === "back" ? (
            <TouchableOpacity onPress={toggleFlash}>
              <Ionicons
                name={flash === "on" ? "flash" : "flash-off"}
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 30 }} />
          )}

          {/* TROCAR CAMERA */}
          <TouchableOpacity onPress={toggleCamera}>
            <Ionicons name="camera-reverse" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* ZOOM */}
        <View
          style={{
            position: "absolute",
            bottom: 160,
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <TouchableOpacity
            onPress={() => setZoom(0)}
            style={{
              backgroundColor: zoom === 0 ? "#fff" : "rgba(0,0,0,0.5)",
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 999,
            }}
          >
            <Text
              style={{
                color: zoom === 0 ? "#000" : "#fff",
                fontWeight: "bold",
              }}
            >
              1x
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setZoom(0.2)}
            style={{
              backgroundColor: zoom === 0.2 ? "#fff" : "rgba(0,0,0,0.75)",
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 999,
            }}
          >
            <Text
              style={{
                color: zoom === 0.2 ? "#000" : "#fff",
                fontWeight: "bold",
              }}
            >
              2x
            </Text>
          </TouchableOpacity>
        </View>

        {/* BARRA INFERIOR */}
        <View
          style={{
            position: "absolute",
            bottom: 40,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          {/* MINIATURAS */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setSelectedIndex(totalPhotos.length - 1);
              setGalleryOpen(true);
            }}
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              overflow: "hidden",
              backgroundColor: "rgba(255,255,255,0.1)",
              borderWidth: 2,
              borderColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {totalPhotos.length > 0 ? (
              <>
                <Image
                  source={{ uri: totalPhotos[totalPhotos.length - 1] }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />

                {/* CONTADOR */}
                <View
                  style={{
                    position: "absolute",
                    right: 4,
                    top: 4,
                    backgroundColor: "#000",
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: "bold",
                    }}
                  >
                    {totalPhotos.length}
                  </Text>
                </View>
              </>
            ) : (
              <Ionicons name="images" size={24} color="#fff" />
            )}
          </TouchableOpacity>

          {/* BOTÃO FOTO */}
          <TouchableOpacity
            disabled={totalPhotos.length >= MAX_IMAGES}
            onPress={takePicture}
            style={{
              width: 86,
              height: 86,
              borderRadius: 999,
              borderWidth: 4,
              borderColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 72,
                height: 72,
                borderRadius: 999,
                backgroundColor:
                  totalPhotos.length >= MAX_IMAGES
                    ? "rgba(255,255,255,0.25)"
                    : "#fff",
              }}
            >
              <Text
                style={{
                  color: totalPhotos.length >= MAX_IMAGES ? "#e5e5e5" : "#111",

                  fontWeight: "800",
                  fontSize: 15,
                }}
              >
                {totalPhotos.length} / {MAX_IMAGES}
              </Text>
            </View>
          </TouchableOpacity>

          {/* CONFIRMAR */}
          <TouchableOpacity
            disabled={totalPhotos.length === 0}
            onPress={() => {
              cameraData?.callback(photos);
              router.back();
            }}
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              backgroundColor:
                totalPhotos.length > 0 ? "#4CAF50" : "rgba(255,255,255,0.2)",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="checkmark" size={34} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* GRID */}
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "space-evenly",
          }}
        >
          {/* LINHAS HORIZONTAIS */}
          <View
            style={{
              borderTopWidth: 1,
              borderColor: "rgba(255,255,255,0.5)",
            }}
          />

          <View
            style={{
              borderTopWidth: 1,
              borderColor: "rgba(255,255,255,0.5)",
            }}
          />
        </View>

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {/* LINHAS VERTICAIS */}
          <View
            style={{
              borderLeftWidth: 1,
              borderColor: "rgba(255,255,255,0.5)",
            }}
          />

          <View
            style={{
              borderLeftWidth: 1,
              borderColor: "rgba(255,255,255,0.5)",
            }}
          />
        </View>

        {/* OVERLAY BAIXO */}
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 150,
            backgroundColor: "#000",
            zIndex: -100,
          }}
        />
      </View>

      {/* TELA PREVIEW */}
      {galleryOpen && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* FOTO */}
          <Image
            source={{ uri: galleryPhotos[selectedIndex] }}
            style={{
              width: "100%",
              height: "75%",
            }}
            resizeMode="contain"
          />

          {/* CONTADOR */}
          <Text
            style={{
              position: "absolute",
              top: 60,
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {selectedIndex + 1} / {totalPhotos.length}
          </Text>

          {/* FECHAR */}
          <TouchableOpacity
            onPress={() => setGalleryOpen(false)}
            style={{
              position: "absolute",
              top: 50,
              left: 20,
            }}
          >
            <Ionicons name="close" size={34} color="#fff" />
          </TouchableOpacity>

          {/* REMOVER */}
          <TouchableOpacity
            disabled={isExistingImage}
            onPress={() => {
              const newIndex = selectedIndex - existingImages.length;

              const updated = photos.filter((_, i) => i !== newIndex);

              setPhotos(updated);

              const updatedGallery = [...existingImages, ...updated];

              if (updatedGallery.length === 0) {
                setGalleryOpen(false);
                return;
              }

              if (selectedIndex >= updatedGallery.length) {
                setSelectedIndex(updatedGallery.length - 1);
              }
            }}
            style={{
              position: "absolute",
              top: 50,
              right: 20,
            }}
          >
            <Ionicons
              name="trash"
              size={30}
              color={isExistingImage ? "#666" : "#ff5252"}
            />
          </TouchableOpacity>

          {/* MINIATURAS */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              position: "absolute",
              bottom: 120,
              zIndex: 20,
              elevation: 20,
            }}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
          >
            {galleryPhotos.map((photo, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedIndex(index)}
                style={{
                  borderWidth: selectedIndex === index ? 3 : 0,
                  borderColor: "#fff",
                  borderRadius: 12,
                }}
              >
                <Image
                  source={{ uri: photo }}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* CONFIRMAR */}
          <TouchableOpacity
            onPress={() => {
              cameraData?.callback(photos);
              router.back();
            }}
            style={{
              position: "absolute",
              bottom: 40,
              backgroundColor: "#4CAF50",
              paddingHorizontal: 40,
              paddingVertical: 16,
              borderRadius: 999,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Continuar
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
