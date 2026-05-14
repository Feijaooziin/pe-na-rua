import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { categories } from "@/src/constants/categories";
import { colors } from "@/src/theme/colors";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};

export default function FilterBar({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: "#f7f9f4",
        borderBottomWidth: 1,
        borderBottomColor: "#dfe5d7",
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      {/* BUSCA */}
      <View
        style={{
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 14,
            paddingHorizontal: 14,
            height: 52,
            borderWidth: 1,
            borderColor: "#dfe5d7",
            shadowColor: "#000",
            shadowOpacity: 0.03,
            shadowRadius: 4,
            elevation: 1,
          }}
        >
          <Ionicons
            name="search"
            size={20}
            color="#777"
            style={{ marginRight: 8 }}
          />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar por nome..."
            placeholderTextColor="#999"
            style={{
              flex: 1,
              color: colors.text,
              fontSize: 15,
            }}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={24} color={colors.danger} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* CATEGORIAS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 12,
          paddingHorizontal: 15,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => setSelectedCategory("all")}
          style={{
            backgroundColor:
              selectedCategory === "all" ? colors.primary : "#fff",

            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 999,
            marginRight: 10,

            borderWidth: 1,
            borderColor:
              selectedCategory === "all" ? colors.primary : "#dce3d3",
          }}
        >
          <Text
            style={{
              color: selectedCategory === "all" ? "#fff" : colors.text,
              fontWeight: "bold",
            }}
          >
            Todas
          </Text>
        </TouchableOpacity>

        {categories.map((item) => {
          const isSelected = selectedCategory === item.value;

          return (
            <TouchableOpacity
              key={item.value}
              onPress={() => setSelectedCategory(item.value)}
              style={{
                backgroundColor: isSelected ? colors.primary : "#fff",

                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 999,
                marginRight: 10,

                borderWidth: 1,
                borderColor: isSelected ? colors.primary : "#dce3d3",
              }}
            >
              <Text
                style={{
                  color: isSelected ? "#fff" : colors.text,
                  fontWeight: "bold",
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
