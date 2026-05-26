import { useCallback } from "react";
import { Switch, Text, View } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { useSettings } from "@/src/hooks/useSettings";
import { darkTheme, lightTheme } from "@/src/theme/themes";

type SwitchItemProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function SwitchItem({ label, value, onValueChange }: SwitchItemProps) {
  const { settings, loadSettings } = useSettings();

  const colors = settings?.theme === "dark" ? darkTheme : lightTheme;

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, []),
  );

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Text style={{ color: colors.text }}>{label}</Text>

      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={colors.primary}
        trackColor={{
          false: colors.switchTrackDisabled,
          true: colors.switchTrack,
        }}
      />
    </View>
  );
}

export function SwitchDangerItem({
  label,
  value,
  onValueChange,
}: SwitchItemProps) {
  const { settings, loadSettings } = useSettings();

  const colors = settings?.theme === "dark" ? darkTheme : lightTheme;

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, []),
  );

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderColor: colors.borderDanger,
      }}
    >
      <Text style={{ color: colors.danger }}>{label}</Text>

      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={colors.danger}
        trackColor={{
          false: colors.switchTrackDisabled,
          true: `${colors.danger}77`,
        }}
      />
    </View>
  );
}
