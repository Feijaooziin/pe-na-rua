import { Switch, Text, View } from "react-native";

import { useTheme } from "@/src/hooks/useTheme";
import { FONT_SIZE, SPACING } from "@/src/theme/layout";

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

        padding: SPACING.lg,

        borderBottomWidth: 1,
        borderColor: colors.border,

        backgroundColor: colors.surface,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: FONT_SIZE.sm,
          fontWeight: "500",
          flex: 1,
          paddingRight: SPACING.sm,
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

        padding: SPACING.lg,

        borderBottomWidth: 1,
        borderColor: colors.borderDanger,

        backgroundColor: colors.surface,
      }}
    >
      <Text
        style={{
          color: colors.danger,
          fontSize: FONT_SIZE.sm,
          fontWeight: "600",
          flex: 1,
          paddingRight: SPACING.sm,
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
