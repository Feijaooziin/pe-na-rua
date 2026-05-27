import RNPickerSelect from "react-native-picker-select";

import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { useTheme } from "@/src/hooks/useTheme";

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  label: string;
  value?: string | number;
  onChange: (value: any) => void;
  items: Option[];
  description?: string;
};

export default function PickerItem({
  label,
  value,
  onChange,
  items,
  description,
}: Props) {
  const { colors, isDark } = useTheme();

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
          fontSize: 15,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>

      {description && (
        <Text
          style={{
            marginBottom: 10,
            color: colors.textMuted,
            fontSize: 12,
            lineHeight: 18,
          }}
        >
          {description}
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
        <RNPickerSelect
          value={value}
          onValueChange={onChange}
          items={items}
          useNativeAndroidPickerStyle={false}
          // darkTheme={isDark}
          placeholder={{}}
          Icon={() => (
            <Ionicons
              name="chevron-down"
              size={20}
              color={colors.iconSecondary}
            />
          )}
          style={{
            inputIOS: {
              color: colors.text,
              backgroundColor: colors.input,
              paddingVertical: 14,
              paddingHorizontal: 14,
              fontSize: 15,
            },

            inputAndroid: {
              color: colors.text,
              backgroundColor: colors.input,
              paddingVertical: 12,
              paddingHorizontal: 14,
              fontSize: 15,
            },

            viewContainer: {
              borderWidth: 1,
              borderColor: colors.inputBorder,
              borderRadius: 10,
              backgroundColor: colors.input,
            },

            placeholder: {
              color: colors.placeholder,
            },

            iconContainer: {
              top: 10,
              right: 16,
            },

            modalViewMiddle: {
              backgroundColor: colors.modal,
            },

            modalViewBottom: {
              backgroundColor: colors.modal,
            },

            done: {
              color: colors.primary,
              fontWeight: "bold",
            },
          }}
        />
      </View>
    </View>
  );
}
