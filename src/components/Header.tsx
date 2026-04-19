import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";

export default function Header() {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFF",
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        borderBottomWidth: 2,
        borderColor: "#333",
        marginBottom: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu" size={32} color={colors.text} />
        </TouchableOpacity>

        <Image
          source={require("../../assets/images/icon.png")}
          style={{
            width: 35,
            height: 35,
            borderRadius: 8,
            marginHorizontal: 10,
          }}
        />

        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: colors.text,
          }}
        >
          Pé na Rua 🌳
        </Text>
      </View>
    </SafeAreaView>
  );
}
