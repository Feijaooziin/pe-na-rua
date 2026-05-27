import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";

import { useTheme } from "@/src/hooks/useTheme";

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  label: string;
  desc?: string;
  value?: string | number;
  onChange: (value: any) => void;
  items: Option[];
};

export default function PickerItem({
  label,
  desc,
  value,
  onChange,
  items,
}: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
      }}
    >
      <Text
        style={{
          marginBottom: 6,
          color: colors.text,
          fontSize: 15,
          fontWeight: "500",
        }}
      >
        {label}
      </Text>

      {desc && (
        <Text
          style={{
            marginBottom: 10,
            color: colors.textMuted,
            fontSize: 12,
            lineHeight: 18,
          }}
        >
          {desc}
        </Text>
      )}

      <View
        style={{
          borderWidth: 1,
          borderColor: colors.inputBorder,
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: colors.input,
        }}
      >
        <Picker
          style={{
            color: colors.text,
            backgroundColor: colors.input,
          }}
          dropdownIconColor={colors.icon}
          selectedValue={value}
          onValueChange={onChange}
        >
          {items.map((item) => (
            <Picker.Item
              key={String(item.value)}
              label={item.label}
              value={item.value}
              color={colors.text}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}
