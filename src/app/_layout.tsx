import { ApolloProvider } from "@apollo/client";
import type { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useNavigation,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import { useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { DrawerContent } from "@/components/DrawerContent";
import { SplashScreen } from "@/components/SplashScreen";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ColorSchemeProvider, useColorScheme } from "@/contexts/ColorSchemeContext";
import { Colors } from "@/constants/Colors";
import { client } from "@/lib/apollo";

const CUSTOM_DARK_THEME = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.dark.background,
  },
};

const CUSTOM_LIGHT_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.light.background,
  },
};

function DrawerHeaderLeft() {
  const navigation = useNavigation<DrawerNavigationProp<Record<string, unknown>>>();
  const { colorScheme } = useColorScheme();
  const color = colorScheme === "dark" ? Colors.dark.text : Colors.light.text;
  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={{ marginLeft: 16 }}
      accessibilityRole="button"
      accessibilityLabel="Open menu"
    >
      <IconSymbol name="line.3.horizontal" size={24} color={color} />
    </TouchableOpacity>
  );
}

function DrawerHeaderTitle() {
  const segments = useSegments();
  const { colorScheme } = useColorScheme();
  const color = colorScheme === "dark" ? Colors.dark.text : Colors.light.text;
  const title =
    segments.includes("settings") ? "Settings"
    : segments.includes("profile") ? "Profile"
    : "Home";
  return <Text style={{ fontSize: 18, fontWeight: "600", color }}>{title}</Text>;
}

function ThemedRootContent() {
  const { colorScheme } = useColorScheme();
  return (
    <ThemeProvider
      value={colorScheme === "dark" ? CUSTOM_DARK_THEME : CUSTOM_LIGHT_THEME}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{
            headerShown: true,
            headerLeft: () => <DrawerHeaderLeft />,
            headerStyle: {
              backgroundColor:
                colorScheme === "dark"
                  ? Colors.dark.background
                  : Colors.light.background,
            },
            headerTintColor:
              colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
          }}
        >
          <Drawer.Screen
            name="(tabs)"
            options={{
              headerShown: true,
              headerTitle: () => <DrawerHeaderTitle />,
            }}
          />
          <Drawer.Screen name="+not-found" options={{ headerShown: true }} />
        </Drawer>
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [showSplash, setShowSplash] = useState(true);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <ColorSchemeProvider>
        {showSplash ? (
          <SplashScreen
            shouldFadeOut={true}
            onFinish={() => setShowSplash(false)}
          />
        ) : (
          <ThemedRootContent />
        )}
      </ColorSchemeProvider>
    </ApolloProvider>
  );
};

export default RootLayout;
