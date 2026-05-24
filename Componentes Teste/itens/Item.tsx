import { colors } from "@/src/theme/colors";
import { Text, TouchableOpacity } from "react-native";

type ItemProps = {
  label: string;
  desc?: string;
  onPress?: () => void;
};

export function Item({ label, desc, onPress }: ItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 15,
        borderBottomWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Text style={{ color: colors.text }}>{label}</Text>

      {desc && (
        <Text
          style={{
            fontSize: 12,
            color: "#888",
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
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 15,
        borderBottomWidth: 1,
        borderColor: colors.borderDanger,
      }}
    >
      <Text style={{ color: colors.danger }}>{label}</Text>

      {desc && (
        <Text
          style={{
            fontSize: 12,
            color: "#888",
            marginTop: 4,
          }}
        >
          {desc}
        </Text>
      )}
    </TouchableOpacity>
  );
}
