import { Text, View } from "react-native";

import { FONT_SIZE, RADIUS, SPACING } from "@/src/theme/layout";
import { getCategoryColor, getCategoryLabel } from "@/src/utils/category";

type Props = {
  category: any;
  small?: boolean;
};

export default function CategoryBadge({ category, small = false }: Props) {
  return (
    <View
      style={{
        alignSelf: "flex-start",
        backgroundColor: getCategoryColor(category),
        paddingHorizontal: small ? SPACING.sm : SPACING.md,
        paddingVertical: small ? SPACING.xs : SPACING.sm,
        borderRadius: RADIUS.full,
        marginTop: small ? SPACING.xs : SPACING.sm,
      }}
    >
      <Text
        style={{
          color: "#FFFFFF",
          fontWeight: "bold",
          fontSize: small ? FONT_SIZE.xs - 2 : FONT_SIZE.sm - 1,
        }}
      >
        {getCategoryLabel(category)}
      </Text>
    </View>
  );
}
