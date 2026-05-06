import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useSettings } from "@/src/hooks/useSettings";
import { colors } from "@/src/theme/colors";

export default function ShareText() {
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
            updateSetting({ shareText: text });
            router.back();
          },
        },
      ],
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: 20 }}>
        <Text style={{ marginBottom: 10 }}>
          Esse texto será enviado ao compartilhar:
        </Text>

        <TextInput
          value={text}
          onChangeText={setText}
          multiline
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 15,
            minHeight: 120,
            textAlignVertical: "top",
            marginBottom: 20,
          }}
        />

        <TouchableOpacity
          onPress={handleSave}
          style={{
            backgroundColor: colors.primary,
            padding: 15,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
