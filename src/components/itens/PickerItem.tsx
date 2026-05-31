import RNPickerSelect from "react-native-picker-select";

import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { useTheme } from "@/src/hooks/useTheme";
import { FONT_SIZE, ICON_SIZE, RADIUS, SPACING } from "@/src/theme/layout";

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  label: string;
  description?: string;
  value?: string | number;
  onChange: (value: any) => void;
  items: Option[];
};

export default function PickerItem({
  label,
  description,
  value,
  onChange,
  items,
}: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Text
        style={{
          marginBottom: SPACING.sm,
          color: colors.text,
          fontSize: FONT_SIZE.sm,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>

      {description && (
        <Text
          style={{
            marginBottom: SPACING.md,
            color: colors.textMuted,
            fontSize: FONT_SIZE.xs,
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
          borderRadius: RADIUS.md,
          overflow: "hidden",
          backgroundColor: colors.input,
        }}
      >
        <RNPickerSelect
          value={value}
          onValueChange={onChange}
          items={items}
          useNativeAndroidPickerStyle={false}
          placeholder={{}}
          Icon={() => (
            <Ionicons
              name="chevron-down"
              size={ICON_SIZE.md}
              color={colors.iconSecondary}
            />
          )}
          style={{
            inputIOS: {
              color: colors.text,
              backgroundColor: colors.input,
              paddingVertical: SPACING.md,
              paddingHorizontal: SPACING.md,
              fontSize: FONT_SIZE.sm,
            },

            inputAndroid: {
              color: colors.text,
              backgroundColor: colors.input,
              paddingVertical: SPACING.md,
              paddingHorizontal: SPACING.md,
              fontSize: FONT_SIZE.sm,
            },

            viewContainer: {
              borderWidth: 1,
              borderColor: colors.inputBorder,
              borderRadius: RADIUS.sm,
              backgroundColor: colors.input,
            },

            placeholder: {
              color: colors.placeholder,
            },

            iconContainer: {
              top: SPACING.sm,
              right: SPACING.lg,
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
