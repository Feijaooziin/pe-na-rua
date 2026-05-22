import { colors } from "@/src/theme/colors";
import { Text, TouchableOpacity } from "react-native";

type ItemProps = {
  label: string;
  variant?: string;
  onPress?: () => void;
};

export function Item({ label, onPress }: ItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 15,
        borderBottomWidth: 1,
        borderColor: "#eee",
      }}
    >
      <Text style={{ color: colors.text }}>{label}</Text>
    </TouchableOpacity>
  );
}

export function DangerItem({ label, onPress }: ItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 15,
        borderBottomWidth: 1,
        borderColor: "#eee",
      }}
    >
      <Text style={{ color: colors.danger, fontWeight: "bold" }}>{label}</Text>
    </TouchableOpacity>
  );
}
