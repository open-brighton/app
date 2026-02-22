import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export function DrawerContent(props: DrawerContentComponentProps) {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const backgroundStyle = { backgroundColor: colors.background };
  const textColor = colors.text;
  const iconColor = colors.icon;

  const handleNavigate = (path: string) => {
    router.navigate(path as never);
    props.navigation.closeDrawer();
  };

  return (
    <View style={[styles.container, backgroundStyle, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleNavigate("/(tabs)")}
          accessibilityRole="button"
          accessibilityLabel="Home"
        >
          <IconSymbol name="house.fill" size={24} color={iconColor} />
          <Text style={[styles.label, { color: textColor }]}>Home</Text>
        </TouchableOpacity>

        <Text style={[styles.sectionHeader, { color: colors.icon }]}>
          Profile
        </Text>

        <TouchableOpacity
          style={styles.item}
          onPress={() => handleNavigate("/(tabs)/profile")}
          accessibilityRole="button"
          accessibilityLabel="Profile"
        >
          <IconSymbol name="person.fill" size={24} color={iconColor} />
          <Text style={[styles.label, { color: textColor }]}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => handleNavigate("/(tabs)/profile/settings")}
          accessibilityRole="button"
          accessibilityLabel="Settings"
        >
          <IconSymbol name="gearshape.fill" size={24} color={iconColor} />
          <Text style={[styles.label, { color: textColor }]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    gap: 16,
    minHeight: 48,
  },
  label: {
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 16,
    marginBottom: 4,
    marginLeft: 12,
  },
});
