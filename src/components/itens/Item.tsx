import { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { useSettings } from "@/src/hooks/useSettings";
import { darkTheme, lightTheme } from "@/src/theme/themes";

type ItemProps = {
  label: string;
  desc?: string;
  onPress?: () => void;
};

export function Item({ label, desc, onPress }: ItemProps) {
  const { settings, loadSettings } = useSettings();

  const colors = settings?.theme === "dark" ? darkTheme : lightTheme;

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, []),
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 15,
        borderBottomWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Text
        style={{
          color: colors.text,
        }}
      >
        {label}
      </Text>

      {desc && (
        <Text
          style={{
            fontSize: 12,
            color: colors.textMuted,
            marginTop: 4,
          }}
        >
          {desc}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export function DangerItem({ label, desc, onPress }: ItemProps) {
  const { settings, loadSettings } = useSettings();

  const colors = settings?.theme === "dark" ? darkTheme : lightTheme;

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, []),
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 15,
        borderBottomWidth: 1,
        borderColor: colors.borderDanger,
      }}
    >
      <Text
        style={{
          color: colors.danger,
        }}
      >
        {label}
      </Text>

      {desc && (
        <Text
          style={{
            fontSize: 12,
            color: colors.textMuted,
            marginTop: 4,
          }}
        >
          {desc}
        </Text>
      )}
    </TouchableOpacity>
  );
}
