import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "Pé na Rua 🌳" }: HeaderProps) {
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
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingRight: 24,
        }}
      >
        {/* ESQUERDA (menu + título) */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Ionicons name="menu" size={32} color={colors.text} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.text,
              marginLeft: 24, // 👈 espaçamento do ícone
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>

        {/* DIREITA (logo) */}
        <Image
          source={require("../../assets/images/logo.jpeg")}
          style={{
            width: 45,
            height: 45,
            borderRadius: 8,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
