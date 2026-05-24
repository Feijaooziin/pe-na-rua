// import { CameraView, useCameraPermissions } from "expo-camera";
// import { router } from "expo-router";
// import { useRef } from "react";
// import { Text, TouchableOpacity, View } from "react-native";

// import { emitCameraPhoto } from "@/src/store/camera";

// export default function CameraScreen() {
//   const [permission, requestPermission] = useCameraPermissions();

//   const cameraRef = useRef<CameraView>(null);

//   if (!permission) {
//     return <View />;
//   }

//   if (!permission.granted) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <TouchableOpacity onPress={requestPermission}>
//           <Text>Permitir câmera</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   async function takePhoto() {
//     const photo = await cameraRef.current?.takePictureAsync({
//       quality: 0.7,
//     });

//     if (!photo?.uri) return;

//     emitCameraPhoto(photo.uri);

//     router.back();
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />

//       <TouchableOpacity
//         onPress={takePhoto}
//         style={{
//           position: "absolute",
//           bottom: 40,
//           alignSelf: "center",
//           width: 80,
//           height: 80,
//           borderRadius: 999,
//           backgroundColor: "#fff",
//         }}
//       />
//     </View>
//   );
// }

import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView, FlashMode } from "expo-camera";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function CameraScreen() {
  const cameraRef = useRef<CameraView>(null);

  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");

  const [preview, setPreview] = useState<string | null>(null);

  async function takePicture() {
    const photo = await cameraRef.current?.takePictureAsync({
      quality: 0.7,
    });

    if (!photo) return;

    setPreview(photo.uri);
  }

  function toggleCamera() {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  }

  function toggleFlash() {
    setFlash((prev) => (prev === "off" ? "on" : "off"));
  }

  // PREVIEW
  if (preview) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: preview }}
          style={{
            width: "100%",
            height: "80%",
          }}
          resizeMode="contain"
        />

        <View
          style={{
            flexDirection: "row",
            gap: 20,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => setPreview(null)}
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 12,
            }}
          >
            <Text>Refazer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // salvar imagem
            }}
            style={{
              backgroundColor: "#4CAF50",
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Usar foto</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing={facing}
        flash={flash}
      >
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
          <TouchableOpacity onPress={toggleFlash}>
            <Ionicons
              name={flash === "on" ? "flash" : "flash-off"}
              size={30}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleCamera}>
            <Ionicons name="camera-reverse" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* BOTÃO FOTO */}
        <View
          style={{
            position: "absolute",
            bottom: 50,
            width: "100%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={takePicture}
            style={{
              width: 80,
              height: 80,
              borderRadius: 999,
              backgroundColor: "#fff",
              borderWidth: 5,
              borderColor: "#ddd",
            }}
          />
        </View>
      </CameraView>
    </View>
  );
}
