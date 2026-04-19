import Header from "@/src/components/Header";
import { colors } from "@/src/theme/colors";
import { Text, View } from "react-native";

export default function Map() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <Text>WORK IN PROGRESS 🗺️</Text>
      </View>
    </View>
  );
}
