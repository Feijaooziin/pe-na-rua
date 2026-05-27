import { useTheme } from "@/src//hooks/useTheme";
import { useSettings } from "@/src/hooks/useSettings";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "Pé na Rua 🌳" }: HeaderProps) {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  const { updateSetting } = useSettings();

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
              marginLeft: 16,
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>

        {/* DIREITA (logo) */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <Image
            source={require("../../assets/images/logo.jpeg")}
            style={{
              width: 45,
              height: 45,
              borderRadius: 100,
            }}
          />
          <TouchableOpacity
            onPress={() =>
              updateSetting({
                theme: isDark ? "light" : "dark",
              })
            }
            activeOpacity={0.8}
          >
            <Ionicons
              name={isDark ? "sunny" : "moon"}
              size={22}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
