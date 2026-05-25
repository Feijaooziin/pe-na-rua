import { ReactNode, useCallback } from "react";
import { Text, View } from "react-native";

import { useSettings } from "@/src/hooks/useSettings";
import { darkTheme, lightTheme } from "@/src/theme/themes";
import { useFocusEffect } from "@react-navigation/native";

type SectionProps = {
  title: string;
  children?: ReactNode;
};

export function Section({ title, children }: SectionProps) {
  const { settings, loadSettings } = useSettings();
  const colors = settings?.theme === "dark" ? darkTheme : lightTheme;

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, []),
  );

  return (
    <View style={{ marginBottom: 25 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          marginBottom: 8,
          color: colors.textSecondary,
        }}
      >
        {title.toUpperCase()}
      </Text>

      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        {children}
      </View>
    </View>
  );
}

export function DangerSection({ title, children }: SectionProps) {
  const { settings, loadSettings } = useSettings();
  const colors = settings?.theme === "dark" ? darkTheme : lightTheme;

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, []),
  );

  return (
    <View style={{ marginBottom: 25 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          marginBottom: 8,
          color: colors.danger,
        }}
      >
        {title.toUpperCase()}
      </Text>

      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 12,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: colors.borderDanger,
        }}
      >
        {children}
      </View>
    </View>
  );
}
