import { ApolloProvider } from "@apollo/client";
import type { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useNavigation,
} from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import * as Linking from "expo-linking";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import { Link, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { DrawerContent } from "@/components/DrawerContent";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SplashScreen } from "@/components/SplashScreen";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ColorSchemeProvider, useColorScheme } from "@/contexts/ColorSchemeContext";
import { Colors } from "@/constants/Colors";
import config from "@/constants/config";
import { client } from "@/lib/apollo";
import Mapbox from "@rnmapbox/maps";

// Set token before any MapView mounts so tile requests are authenticated
if (config.MAPBOX_ACCESS_TOKEN?.trim()) {
  Mapbox.setAccessToken(config.MAPBOX_ACCESS_TOKEN);
}

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
  const navigation = useNavigation<DrawerNavigationProp<Record<string, object | undefined>>>();
  const router = useRouter();
  const segments = useSegments() as string[];
  const { colorScheme } = useColorScheme();
  const color = colorScheme === "dark" ? Colors.dark.text : Colors.light.text;

  const isNestedInProfile =
    segments.includes("profile") &&
    (segments.includes("settings") || segments.includes("debug"));

  const isInfoStack =
    segments.includes("feedback") ||
    segments.includes("contact") ||
    segments.includes("about") ||
    segments.includes("donate") ||
    segments.includes("privacy") ||
    segments.includes("terms") ||
    segments.includes("settings");

  if (isNestedInProfile || isInfoStack) {
    return (
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginLeft: 16, padding: 4 }}
        accessibilityRole="button"
        accessibilityLabel={isInfoStack ? "Back" : "Back to Profile"}
      >
        <IconSymbol name="chevron.left" size={24} color={color} />
      </TouchableOpacity>
    );
  }

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
  const segments = useSegments() as string[];
  const { colorScheme } = useColorScheme();
  const color = colorScheme === "dark" ? Colors.dark.text : Colors.light.text;
  const title =
    segments.includes("explore") ? "Explore"
    : segments.includes("guide") ? "Guide"
    : segments.includes("debug") ? "Debug"
    : segments.includes("settings") ? "Settings"
    : segments.includes("profile") ? "Profile"
    : segments.includes("chat") ? "Chat"
    : segments.includes("feedback") ? "Feedback"
    : segments.includes("contact") ? "Contact"
    : segments.includes("about") ? "About"
    : segments.includes("donate") ? "Donate"
    : segments.includes("privacy") ? "Privacy"
    : segments.includes("terms") ? "Terms & Conditions"
    : "Home";
  return <Text style={{ fontSize: 18, fontWeight: "600", color }}>{title}</Text>;
}

function DrawerHeaderRight() {
  const segments = useSegments() as string[];
  const { colorScheme } = useColorScheme();
  const color = colorScheme === "dark" ? Colors.dark.text : Colors.light.text;
  const isProfileScreen =
    segments.includes("profile") && !segments.includes("settings");
  if (!isProfileScreen) return null;
  return (
    <Link href="/settings" asChild>
      <TouchableOpacity
        style={{ marginRight: 16, padding: 4 }}
        accessibilityRole="button"
        accessibilityLabel="Open settings"
      >
        <IconSymbol name="gearshape.fill" size={24} color={color} />
      </TouchableOpacity>
    </Link>
  );
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
              headerRight: () => <DrawerHeaderRight />,
            }}
          />
          <Drawer.Screen
            name="explore"
            options={{
              headerShown: true,
              headerTitle: () => <DrawerHeaderTitle />,
              headerRight: () => <DrawerHeaderRight />,
            }}
          />
          <Drawer.Screen
            name="(info)"
            options={{
              headerShown: true,
              headerTitle: () => <DrawerHeaderTitle />,
            }}
          />
          <Drawer.Screen
            name="guide"
            options={{
              headerShown: false,
              drawerItemStyle: { display: "none" },
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
      <StripeProvider
        publishableKey={config.STRIPE_PUBLISHABLE_KEY}
        urlScheme={Linking.createURL("")}
      >
        <ColorSchemeProvider>
          <ErrorBoundary>
            {showSplash ? (
              <SplashScreen
                shouldFadeOut={true}
                onFinish={() => setShowSplash(false)}
              />
            ) : (
              <ThemedRootContent />
            )}
          </ErrorBoundary>
        </ColorSchemeProvider>
      </StripeProvider>
    </ApolloProvider>
  );
};

export default RootLayout;
