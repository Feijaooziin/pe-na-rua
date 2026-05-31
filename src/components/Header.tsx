import { useTheme } from "@/src/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type HeaderVariant = "menu" | "back" | "search" | "close";

interface HeaderProps {
  title?: string;
  variant?: HeaderVariant;
  onSearchPress?: () => void;
  onClosePress?: () => void;
}

export default function Header({
  title = "Pé na Rua 🌳",
  variant = "menu",
  onSearchPress,
  onClosePress,
}: HeaderProps) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const renderLeftIcon = () => {
    switch (variant) {
      case "menu":
        return <Ionicons name="menu" size={32} color={colors.text} />;

      case "back":
        return <Ionicons name="arrow-back" size={32} color={colors.text} />;

      case "search":
        return <Ionicons name="search" size={32} color={colors.text} />;

      case "close":
        return <Ionicons name="close" size={32} color={colors.text} />;
    }
  };

  const handlePress = () => {
    switch (variant) {
      case "menu":
        navigation.dispatch(DrawerActions.openDrawer());
        break;

      case "back":
        navigation.canGoBack?.() && navigation.goBack();
        break;

      case "search":
        onSearchPress?.();
        break;

      case "close":
        onClosePress?.();
        break;
    }
  };

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
          <TouchableOpacity onPress={handlePress}>
            {renderLeftIcon()}
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

        {/* DIREITA */}
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
