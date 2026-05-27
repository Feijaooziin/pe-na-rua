import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useSettings } from "@/src/hooks/useSettings";
import { useTheme } from "@/src/hooks/useTheme";

export default function ShareText() {
  const { colors } = useTheme();

  const { settings, updateSetting } = useSettings();

  const [text, setText] = useState("");

  useEffect(() => {
    if (settings?.shareText && text === "") {
      setText(settings.shareText);
    }
  }, [settings]);

  function handleSave() {
    Alert.alert(
      "Salvar alterações",
      "Deseja salvar o texto de compartilhamento?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Salvar",
          onPress: () => {
            updateSetting({
              shareText: text,
            });

            router.back();
          },
        },
      ],
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 8,
          }}
        >
          Texto de compartilhamento
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 20,
          }}
        >
          Esse texto será enviado ao compartilhar uma árvore.
        </Text>

        <TextInput
          value={text}
          onChangeText={setText}
          multiline
          placeholder="Digite o texto de compartilhamento..."
          placeholderTextColor={colors.textMuted}
          style={{
            backgroundColor: colors.surface,
            color: colors.text,

            borderWidth: 1,
            borderColor: colors.border,

            borderRadius: 16,

            padding: 16,

            minHeight: 180,

            textAlignVertical: "top",

            marginBottom: 20,
          }}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSave}
          style={{
            backgroundColor: colors.primary,

            paddingVertical: 16,

            borderRadius: 14,

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontWeight: "700",
              fontSize: 15,
            }}
          >
            Salvar alterações
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
