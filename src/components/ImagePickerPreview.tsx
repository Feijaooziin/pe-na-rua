import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/src/theme/colors";

type Props = {
  images: string[];

  onRemove: (index: number) => void;

  onSetMain: (index: number) => void;
};

export default function ImagePickerPreview({
  images,
  onRemove,
  onSetMain,
}: Props) {
  if (images.length === 0) {
    return null;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginBottom: 8 }}
    >
      {images.map((img, index) => (
        <View
          key={index}
          style={{
            marginLeft: 5,
          }}
        >
          <Image
            source={{ uri: img }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 10,
              marginRight: 10,
            }}
          />

          {/* PRINCIPAL */}
          <TouchableOpacity
            onPress={() => onSetMain(index)}
            style={{
              position: "absolute",
              right: 0,
              backgroundColor: colors.primary,
              borderRadius: 100,
              paddingHorizontal: 6,
              paddingVertical: 2,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 8,
                fontWeight: "bold",
              }}
            >
              PRINCIPAL
            </Text>
          </TouchableOpacity>

          {/* REMOVER */}
          <TouchableOpacity
            onPress={() => onRemove(index)}
            style={{
              position: "absolute",
              left: -5,
              backgroundColor: colors.danger,
              borderRadius: 100,
              paddingHorizontal: 6,
              paddingVertical: 2,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              ✕
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
