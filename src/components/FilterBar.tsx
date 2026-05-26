import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { categories } from "@/src/constants/categories";
import { useTheme } from "@/src/hooks/useTheme";

type SortField = "name" | "category" | "created_at";
type SortOrder = "asc" | "desc";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  selectedCategory: string;
  setSelectedCategory: (value: string) => void;

  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (value: boolean) => void;

  sortField: SortField;
  setSortField: (value: SortField) => void;

  sortOrder: SortOrder;
  setSortOrder: (value: SortOrder) => void;
};

export default function FilterBar({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  showFavoritesOnly,
  setShowFavoritesOnly,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}: Props) {
  const { colors, isDark } = useTheme();

  const [expanded, setExpanded] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);

  const DEFAULT_SORT_FIELD: SortField = "name";
  const DEFAULT_SORT_ORDER: SortOrder = "asc";

  const isDefaultSort =
    sortField === DEFAULT_SORT_FIELD && sortOrder === DEFAULT_SORT_ORDER;

  const hasFilters =
    search.length > 0 || selectedCategory !== "all" || showFavoritesOnly;

  const activeFiltersCount =
    (search ? 1 : 0) +
    (selectedCategory !== "all" ? 1 : 0) +
    (showFavoritesOnly ? 1 : 0);

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          paddingHorizontal: 15,
          marginBottom: 12,
        }}
      >
        {/* ORDENAÇÃO */}
        <TouchableOpacity
          onPress={() => setSortModalVisible(true)}
          activeOpacity={0.8}
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            backgroundColor: colors.surfaceElevated,
            paddingHorizontal: 14,
            height: 42,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: colors.border,
            shadowColor: colors.shadow,
            shadowOpacity: colors.shadowOpacity,
            shadowRadius: 4,
            elevation: 1,
          }}
        >
          <Ionicons
            name="swap-vertical-outline"
            size={18}
            color={colors.icon}
          />

          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: colors.text,
            }}
          >
            {sortField === "name" && "Nome"}
            {sortField === "category" && "Categoria"}
            {sortField === "created_at" && "Data"}

            {" • "}

            {sortOrder === "asc" ? "↑" : "↓"}
          </Text>
        </TouchableOpacity>

        {/* FAVORITOS */}
        {expanded && (
          <TouchableOpacity
            onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
            activeOpacity={0.8}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: showFavoritesOnly
                ? colors.danger
                : colors.surfaceElevated,

              paddingHorizontal: 14,
              height: 42,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: showFavoritesOnly ? colors.danger : colors.border,

              marginTop: 12,
            }}
          >
            <Ionicons
              name="heart"
              size={16}
              color={showFavoritesOnly ? "#fff" : colors.danger}
              style={{ marginRight: 6 }}
            />

            <Text
              style={{
                color: showFavoritesOnly ? "#fff" : colors.text,
                fontWeight: "bold",
              }}
            >
              Favoritos
            </Text>
          </TouchableOpacity>
        )}

        <View
          style={{
            alignItems: "flex-end",
            gap: 8,
          }}
        >
          {/* MOSTRAR/OCULTAR */}
          <TouchableOpacity
            onPress={() => setExpanded(!expanded)}
            activeOpacity={0.8}
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              backgroundColor: colors.surfaceElevated,
              paddingHorizontal: 14,
              height: 42,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: colors.border,
              shadowColor: colors.shadow,
              shadowOpacity: colors.shadowOpacity,
              shadowRadius: 4,
              elevation: 1,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: colors.text,
              }}
            >
              {expanded
                ? "Ocultar"
                : activeFiltersCount > 0
                  ? `Filtros (${activeFiltersCount})`
                  : "Filtros"}
            </Text>

            <Ionicons
              name={expanded ? "close" : "menu"}
              size={18}
              color={colors.icon}
            />
          </TouchableOpacity>

          {/* LIMPAR FILTROS */}
          {hasFilters && (
            <TouchableOpacity
              style={{ marginRight: 12 }}
              onPress={() => {
                setSearch("");
                setSelectedCategory("all");
                setShowFavoritesOnly(false);
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "600",
                  fontSize: 13,
                  textAlign: "right",
                }}
              >
                Limpar Filtros
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {expanded && (
        <>
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
                backgroundColor: colors.input,
                borderRadius: 14,
                paddingHorizontal: 14,
                height: 52,
                borderWidth: 1,
                borderColor: colors.inputBorder,
                shadowColor: colors.shadow,
                shadowOpacity: colors.shadowOpacity,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              <Ionicons
                name="search"
                size={20}
                color={colors.iconSecondary}
                style={{ marginRight: 8 }}
              />

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Buscar por nome..."
                placeholderTextColor={colors.placeholder}
                style={{
                  flex: 1,
                  color: colors.text,
                  fontSize: 15,
                }}
              />

              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch("")}>
                  <Ionicons
                    name="close-circle"
                    size={24}
                    color={colors.danger}
                  />
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
              marginBottom: 12,
            }}
          >
            <TouchableOpacity
              onPress={() => setSelectedCategory("all")}
              style={{
                backgroundColor:
                  selectedCategory === "all"
                    ? colors.primary
                    : colors.surfaceElevated,

                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 999,
                marginRight: 10,

                borderWidth: 1,
                borderColor:
                  selectedCategory === "all" ? colors.primary : colors.border,
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
                    backgroundColor: isSelected
                      ? colors.primary
                      : colors.surfaceElevated,

                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 999,
                    marginRight: 10,

                    borderWidth: 1,
                    borderColor: isSelected ? colors.primary : colors.border,
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
        </>
      )}

      {/* MODAL */}
      <Modal visible={sortModalVisible} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: colors.overlay,
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: colors.modal,
              borderRadius: 18,
              padding: 20,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginBottom: 18,
                color: colors.text,
              }}
            >
              Ordenar
            </Text>

            {/* CAMPO */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 10,
                color: colors.text,
              }}
            >
              Ordenar por
            </Text>

            {[
              { label: "Nome", value: "name" },
              { label: "Categoria", value: "category" },
              { label: "Data de criação", value: "created_at" },
            ].map((item) => {
              const selected = sortField === item.value;

              return (
                <TouchableOpacity
                  key={item.value}
                  onPress={() => setSortField(item.value as any)}
                  style={{
                    paddingVertical: 12,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: colors.divider,
                  }}
                >
                  <Text
                    style={{
                      color: selected ? colors.primary : colors.text,

                      fontWeight: selected ? "bold" : "normal",
                    }}
                  >
                    {item.label}
                  </Text>

                  {selected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              );
            })}

            {/* ORDEM */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginTop: 20,
                marginBottom: 10,
                color: colors.text,
              }}
            >
              Ordem
            </Text>

            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => setSortOrder("asc")}
                style={{
                  flex: 1,
                  backgroundColor:
                    sortOrder === "asc"
                      ? colors.primary
                      : colors.surfaceSecondary,

                  padding: 14,
                  borderRadius: 12,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor:
                    sortOrder === "asc" ? colors.primary : colors.border,
                }}
              >
                <Text
                  style={{
                    color: sortOrder === "asc" ? "#fff" : colors.text,

                    fontWeight: "bold",
                  }}
                >
                  Crescente
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSortOrder("desc")}
                style={{
                  flex: 1,
                  backgroundColor:
                    sortOrder === "desc"
                      ? colors.primary
                      : colors.surfaceSecondary,

                  padding: 14,
                  borderRadius: 12,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor:
                    sortOrder === "desc" ? colors.primary : colors.border,
                }}
              >
                <Text
                  style={{
                    color: sortOrder === "desc" ? "#fff" : colors.text,

                    fontWeight: "bold",
                  }}
                >
                  Decrescente
                </Text>
              </TouchableOpacity>
            </View>

            {/* RESETAR */}
            {!isDefaultSort && (
              <TouchableOpacity
                onPress={() => {
                  setSortField(DEFAULT_SORT_FIELD);
                  setSortOrder(DEFAULT_SORT_ORDER);
                }}
                style={{
                  marginTop: 18,
                  padding: 14,
                  borderRadius: 12,
                  alignItems: "center",
                  backgroundColor: colors.surfaceSecondary,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontWeight: "bold",
                  }}
                >
                  Voltar ao padrão
                </Text>
              </TouchableOpacity>
            )}

            {/* APLICAR */}
            <TouchableOpacity
              onPress={() => setSortModalVisible(false)}
              style={{
                marginTop: 12,
                backgroundColor: colors.primary,
                padding: 14,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Aplicar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
