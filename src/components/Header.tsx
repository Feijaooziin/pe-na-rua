import { useTheme } from "@/src/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderProps {
  title?: string;
  backHeader?: boolean;
}

export default function Header({
  title = "Pé na Rua 🌳",
  backHeader = false,
}: HeaderProps) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
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
        {/* ESQUERDA */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              if (backHeader) {
                navigation.canGoBack?.() && navigation.goBack();
              } else {
                navigation.dispatch(DrawerActions.openDrawer());
              }
            }}
          >
            <Ionicons
              name={backHeader ? "arrow-back" : "menu"}
              size={32}
              color={colors.text}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.text,
              marginLeft: 16,
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>

        {/* DIREITA (logo) */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/images/header-icon.png")}
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
