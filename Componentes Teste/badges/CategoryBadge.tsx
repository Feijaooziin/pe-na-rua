import { getCategoryColor, getCategoryLabel } from "@/src/utils/category";
import { Text, View } from "react-native";

type Props = {
  category: string;
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
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: small ? 10 : 13,
        }}
      >
        {getCategoryLabel(category)}
      </Text>
    </View>
  );
}
