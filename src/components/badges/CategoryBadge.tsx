import { getCategoryColor, getCategoryLabel } from "@/src/utils/category";
import { Text, View } from "react-native";

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
        paddingHorizontal: small ? 8 : 12,
        paddingVertical: small ? 4 : 6,
        borderRadius: 100,
        marginTop: small ? 4 : 6,
      }}
    >
      <Text
        style={{
          color: "#FFFFFF",
          fontWeight: "bold",
          fontSize: small ? 10 : 13,
        }}
      >
        {getCategoryLabel(category)}
      </Text>
    </View>
  );
}
