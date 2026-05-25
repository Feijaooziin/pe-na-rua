import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";

import { colors } from "@/src/theme/colors";

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  label: string;
  value?: string | number;
  onChange: (value: any) => void;
  items: Option[];
};

export default function PickerItem({ label, value, onChange, items }: Props) {
  return (
    <View
      style={{
        padding: 15,
        borderBottomWidth: 1,
        borderColor: "#eee",
      }}
    >
      <Text
        style={{
          marginBottom: 8,
          color: colors.text,
        }}
      >
        {label}
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <Picker
          style={{ color: colors.text }}
          dropdownIconColor={colors.text}
          selectedValue={value}
          onValueChange={onChange}
        >
          {items.map((item) => (
            <Picker.Item
              key={String(item.value)}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}
