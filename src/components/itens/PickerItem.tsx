import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import { useSettings } from "@/src/hooks/useSettings";
import { darkTheme, lightTheme } from "@/src/theme/themes";

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
        padding: 15,
        borderBottomWidth: 1,
        borderColor: colors.border,
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
          borderColor: colors.border,
          borderRadius: 10,
          overflow: "hidden",
          backgroundColor: colors.input,
        }}
      >
        <Picker
          style={{
            color: colors.text,
            backgroundColor: colors.input,
          }}
          dropdownIconColor={colors.text}
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
