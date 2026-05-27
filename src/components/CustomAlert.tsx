import { useTheme } from "@/src/hooks/useTheme";
import { BlurView } from "expo-blur";
import React from "react";
import { Animated, Modal, Pressable, Text, View } from "react-native";

type Props = {
  visible: boolean;
  title: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

export function CustomAlert({
  visible,
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: Props) {
  const { colors, isDark } = useTheme();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Blur background */}
        <BlurView
          intensity={100}
          tint="dark"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        {/* Card */}
        <Animated.View
          style={{
            width: "85%",
            backgroundColor: colors.background,
            borderRadius: 16,
            padding: 18,
          }}
        >
          {/* Title */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 6,
              color: colors.text,
            }}
          >
            {title}
          </Text>

          {/* Message */}
          {message && (
            <Text
              style={{
                fontSize: 13,
                marginBottom: 20,
                color: colors.textSecondary,
              }}
            >
              {message}
            </Text>
          )}

          {/* Buttons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            <Pressable
              onPress={onCancel}
              style={{
                padding: 10,
              }}
            >
              <Text
                style={{
                  color: colors.textSecondary,
                  fontWeight: "600",
                }}
              >
                {cancelText}
              </Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              style={{
                padding: 10,
              }}
            >
              <Text
                style={{
                  color: colors.success,
                  fontWeight: "700",
                }}
              >
                {confirmText}
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

export function CustomAlertDanger({
  visible,
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: Props) {
  const { colors, isDark } = useTheme();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Blur background */}
        <BlurView
          intensity={100}
          tint="dark"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        {/* Card */}
        <Animated.View
          style={{
            width: "85%",
            backgroundColor: colors.background,
            borderRadius: 16,
            padding: 18,
          }}
        >
          {/* Title */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 6,
              color: colors.text,
            }}
          >
            {title}
          </Text>

          {/* Message */}
          {message && (
            <Text
              style={{
                fontSize: 13,
                marginBottom: 20,
                color: colors.textSecondary,
              }}
            >
              {message}
            </Text>
          )}

          {/* Buttons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            <Pressable
              onPress={onCancel}
              style={{
                padding: 10,
              }}
            >
              <Text
                style={{
                  color: colors.textSecondary,
                  fontWeight: "600",
                }}
              >
                {cancelText}
              </Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              style={{
                padding: 10,
              }}
            >
              <Text
                style={{
                  color: colors.danger,
                  fontWeight: "700",
                }}
              >
                {confirmText}
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
