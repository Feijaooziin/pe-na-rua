import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { usePathname } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { ComponentProps, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Header from "@/src/components/Header";
import { useTheme } from "@/src/hooks/useTheme";

/* =========================
   TIPOS
========================= */
type IconName = ComponentProps<typeof Ionicons>["name"];

type MenuItem = {
  type: "item";
  label: string;
  route: string;
  icon: IconName;
  activeIcon?: IconName;
  headerTitle?: string;
};

type MenuGroup = {
  type: "group";
  label: string;
  icon: IconName;
  children: {
    label: string;
    route: string;
    icon: IconName;
    headerTitle?: string;
  }[];
};

type Menu = (MenuItem | MenuGroup)[];

/* =========================
   MENU
========================= */
const getMenu = (colors: any): Menu => [
  {
    type: "item",
    label: "Início",
    route: "home",
    icon: "home-outline",
    activeIcon: "home",
  },
  {
    type: "group",
    label: "Testes",
    icon: "logo-react",
    children: [
      {
        label: "Teste",
        route: "teste/index",
        icon: "flask",
        headerTitle: "Sobre o Teste 🧪",
      },
      {
        label: "Léo",
        route: "teste/leo",
        icon: "person",
        headerTitle: "Sobre o Léo 🧔🏾‍♂️",
      },
    ],
  },
  {
    type: "item",
    label: "Configurações",
    route: "settings",
    icon: "settings-outline",
    activeIcon: "settings",
    headerTitle: "Configurações ⚙️",
  },
  {
    type: "group",
    label: "Sobre",
    icon: "information-circle-outline",
    children: [
      {
        label: "App",
        route: "about/index",
        icon: "phone-portrait-outline",
        headerTitle: "Sobre o App ℹ️",
      },
      {
        label: "Dev",
        route: "about/dev",
        icon: "code-slash-outline",
        headerTitle: "Sobre o Dev 👨‍💻",
      },
    ],
  },
];

/* =========================
   COMPONENTE
========================= */
export default function DrawerLayout() {
  const { colors } = useTheme();
  const pathname = usePathname();
  const menu = getMenu(colors);

  const getHeaderTitle = (route: string) => {
    for (const item of menu) {
      if (item.type === "item") {
        if (item.route === route) {
          return item.headerTitle;
        }
      }

      if (item.type === "group") {
        const child = item.children.find((child) => child.route === route);

        if (child) {
          return child.headerTitle;
        }
      }
    }

    return undefined;
  };

  const getHeader = (route: string) => {
    const title = getHeaderTitle(route);

    return () => <Header title={title} />;
  };

  const isActive = (route: string) => {
    const normalizedRoute = route.endsWith("/index")
      ? route.slice(0, -"/index".length)
      : route;
    return pathname === `/${normalizedRoute}`;
  };

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const groupsState: Record<string, boolean> = {};

    menu.forEach((item) => {
      if (item.type === "group") {
        const firstRoute = item.children[0]?.route;

        if (firstRoute) {
          const groupPath = firstRoute.split("/")[0];

          groupsState[item.label] = pathname.startsWith(`/${groupPath}`);
        }
      }
    });

    setOpenGroups(groupsState);
  }, [pathname]);

  return (
    <Drawer
      drawerContent={(props) => (
        <View style={{ flex: 1 }}>
          <DrawerContentScrollView {...props}>
            {menu.map((item, index) => {
              /* =========================
                 ITEM NORMAL
              ========================= */
              if (item.type === "item") {
                const active = isActive(item.route);

                return (
                  <DrawerItem
                    key={index}
                    label={item.label}
                    onPress={() =>
                      props.navigation.navigate(item.route as never)
                    }
                    labelStyle={{
                      color: active ? colors.primary : colors.text,
                      fontWeight: "600",
                    }}
                    style={{
                      borderRadius: 12,
                      marginHorizontal: 6,
                      backgroundColor: active
                        ? `${colors.primary}15`
                        : "transparent",
                    }}
                    icon={({ size }) => (
                      <Ionicons
                        name={
                          active ? (item.activeIcon ?? item.icon) : item.icon
                        }
                        size={22}
                        color={active ? colors.primary : colors.text}
                      />
                    )}
                  />
                );
              }

              /* =========================
                 GRUPO
              ========================= */
              if (item.type === "group") {
                const open = openGroups[item.label];

                const groupActive = item.children.some((c) =>
                  isActive(c.route),
                );

                return (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={() =>
                        setOpenGroups((prev) => ({
                          ...prev,
                          [item.label]: !prev[item.label],
                        }))
                      }
                      style={{
                        padding: 14,
                        marginHorizontal: 6,
                        borderRadius: 12,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: groupActive
                          ? `${colors.primary}15`
                          : "transparent",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <Ionicons
                          name={item.icon}
                          size={22}
                          color={groupActive ? colors.primary : colors.text}
                        />

                        <Text
                          style={{
                            color: groupActive ? colors.primary : colors.text,
                            fontWeight: "600",
                          }}
                        >
                          {item.label}
                        </Text>
                      </View>

                      <Ionicons
                        name={open ? "chevron-down" : "chevron-forward"}
                        size={18}
                        color={colors.text}
                      />
                    </TouchableOpacity>

                    {open && (
                      <View style={{ paddingLeft: 20 }}>
                        {item.children.map((child, i) => {
                          const active = isActive(child.route);

                          return (
                            <DrawerItem
                              key={i}
                              label={child.label}
                              onPress={() =>
                                props.navigation.navigate(child.route as never)
                              }
                              labelStyle={{
                                color: active
                                  ? colors.primary
                                  : colors.textSecondary,
                                fontWeight: "600",
                              }}
                              style={{
                                borderRadius: 12,
                                marginHorizontal: 6,
                                backgroundColor: active
                                  ? `${colors.primary}15`
                                  : "transparent",
                              }}
                              icon={({ size }) => (
                                <Ionicons
                                  name={child.icon}
                                  size={20}
                                  color={
                                    active
                                      ? colors.primary
                                      : colors.textSecondary
                                  }
                                />
                              )}
                            />
                          );
                        })}
                      </View>
                    )}
                  </View>
                );
              }

              return null;
            })}
          </DrawerContentScrollView>

          {/* FOOTER */}
          <View
            style={{
              padding: 20,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              marginBottom: 4,
            }}
          >
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              Pé na Rua 🌳 • v1.0.0
            </Text>
          </View>
        </View>
      )}
      screenOptions={({ route }) => ({
        headerShown: true,
        header: getHeader(route.name),
        drawerStyle: {
          backgroundColor: colors.surface,
          width: 280,
        },
        sceneStyle: {
          backgroundColor: colors.background,
        },
      })}
    >
      <Drawer.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen name="settings" />

      <Drawer.Screen
        name="about/index"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="about/dev"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="teste/index"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="teste/leo"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
}
