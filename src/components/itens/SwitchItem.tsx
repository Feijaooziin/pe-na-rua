import { Switch, Text, View } from "react-native";

import { useTheme } from "@/src/hooks/useTheme";

type SwitchItemProps = {
  label: string;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
};

export function SwitchItem({ label, value, onValueChange }: SwitchItemProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        padding: 16,

        borderBottomWidth: 1,
        borderColor: colors.border,

        backgroundColor: colors.surface,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 15,
          fontWeight: "500",
          flex: 1,
          paddingRight: 10,
        }}
      >
        {label}
      </Text>

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
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        padding: 16,

        borderBottomWidth: 1,
        borderColor: colors.borderDanger,

        backgroundColor: colors.surface,
      }}
    >
      <Text
        style={{
          color: colors.danger,
          fontSize: 15,
          fontWeight: "600",
          flex: 1,
          paddingRight: 10,
        }}
      >
        {label}
      </Text>

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
