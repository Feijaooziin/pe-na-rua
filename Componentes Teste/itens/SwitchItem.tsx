import { colors } from "@/src/theme/colors";
import { Switch, Text, View } from "react-native";

type SwitchItemProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function SwitchItem({ label, value, onValueChange }: SwitchItemProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderColor: "#eee",
      }}
    >
      <Text style={{ color: colors.text }}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={colors.primary}
        trackColor={{
          false: "#ccc",
          true: "#4CAF5077",
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
          false: "#ccc",
          true: "#e5383577",
        }}
      />
    </View>
  );
}
