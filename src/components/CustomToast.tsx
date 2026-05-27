import { useTheme } from "@/src/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  Vibration,
  View,
} from "react-native";

type ToastType = "success" | "error" | "info";

type Props = {
  text1: string;
  text2?: string;
  type?: ToastType;
};

export function CustomToast({ text1, text2, type = "info" }: Props) {
  const { colors, isDark } = useTheme();
  const currentType: ToastType = type ?? "info";

  React.useEffect(() => {
    if (Platform.OS === "ios") {
      Haptics.notificationAsync(
        currentType === "success"
          ? Haptics.NotificationFeedbackType.Success
          : currentType === "error"
            ? Haptics.NotificationFeedbackType.Error
            : Haptics.NotificationFeedbackType.Warning,
      );
    } else {
      Vibration.vibrate(60);
    }
  }, [currentType]);

  const iconMap: Record<ToastType, keyof typeof Ionicons.glyphMap> = {
    success: "checkmark-circle",
    error: "close-circle",
    info: "information-circle",
  };

  const colorMap: Record<ToastType, string> = {
    success: colors.success,
    error: colors.danger,
    info: colors.info,
  };

  const icon = iconMap[currentType];
  const color = colorMap[currentType];

  // 🎨 fundo adaptado ao tema
  const backgroundColor = isDark
    ? "rgba(255,255,255,0.75)"
    : "rgba(20,20,20,0.75)";

  return (
    <Animated.View style={styles.container}>
      <BlurView
        intensity={80}
        tint={isDark ? "dark" : "light"}
        style={[styles.blur, { backgroundColor }]}
      >
        <View style={styles.content}>
          <Ionicons name={icon} size={28} color={color} />

          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text
              style={[
                styles.title,
                { color: colors.fabText, fontWeight: "bold" },
              ]}
            >
              {text1}
            </Text>

            {text2 && (
              <Text style={[styles.subtitle, { color: colors.fabText }]}>
                {text2}
              </Text>
            )}
          </View>
        </View>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
  },
  blur: {
    borderRadius: 16,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
});
