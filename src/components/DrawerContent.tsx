import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LottieAnimation } from "@/components/LottieAnimation";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const DRAWER_HEADER_HEIGHT = 100;

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

  const openBrightonWebsite = () => {
    Linking.openURL("https://www.brightonny.gov/");
    props.navigation.closeDrawer();
  };

  return (
    <View
      style={[styles.container, backgroundStyle, { paddingTop: insets.top }]}
    >
      <View
        style={[
          styles.drawerHeader,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.icon,
          },
        ]}
      >
        <LottieAnimation autoPlay loop style={styles.drawerLottie} />
      </View>
      <View style={styles.contentWrapper}>
        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleNavigate("/(tabs)")}
            accessibilityRole="button"
            accessibilityLabel="Home"
          >
            <IconSymbol name="house.fill" size={24} color={iconColor} />
            <Text style={[styles.label, { color: textColor }]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => handleNavigate("/(tabs)/chat")}
            accessibilityRole="button"
            accessibilityLabel="Chat"
          >
            <IconSymbol name="message.fill" size={24} color={iconColor} />
            <Text style={[styles.label, { color: textColor }]}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => handleNavigate("/explore")}
            accessibilityRole="button"
            accessibilityLabel="Explore"
          >
            <IconSymbol name="map.fill" size={24} color={iconColor} />
            <Text style={[styles.label, { color: textColor }]}>Explore</Text>
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
            onPress={() => handleNavigate("/settings")}
            accessibilityRole="button"
            accessibilityLabel="Settings"
          >
            <IconSymbol name="gearshape.fill" size={24} color={iconColor} />
            <Text style={[styles.label, { color: textColor }]}>Settings</Text>
          </TouchableOpacity>

          <Text style={[styles.sectionHeader, { color: colors.icon }]}>
            Information
          </Text>

          <TouchableOpacity
            style={styles.item}
            onPress={() => handleNavigate("/feedback")}
            accessibilityRole="button"
            accessibilityLabel="Submit Feedback"
          >
            <IconSymbol name="text.bubble.fill" size={24} color={iconColor} />
            <Text style={[styles.label, { color: textColor }]}>
              Submit Feedback
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => handleNavigate("/contact")}
            accessibilityRole="button"
            accessibilityLabel="Contact"
          >
            <IconSymbol name="envelope.fill" size={24} color={iconColor} />
            <Text style={[styles.label, { color: textColor }]}>Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => handleNavigate("/about")}
            accessibilityRole="button"
            accessibilityLabel="About"
          >
            <IconSymbol name="info.circle.fill" size={24} color={iconColor} />
            <Text style={[styles.label, { color: textColor }]}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => handleNavigate("/donate")}
            accessibilityRole="button"
            accessibilityLabel="Donate"
          >
            <IconSymbol name="heart.fill" size={24} color={iconColor} />
            <Text style={[styles.label, { color: textColor }]}>Donate</Text>
          </TouchableOpacity>
        </ScrollView>

        <View
          style={[
            styles.pinnedSection,
            { borderTopColor: colors.icon, paddingBottom: insets.bottom },
          ]}
        >
          <Text style={[styles.sectionHeader, { color: colors.icon }]}>
            Links
          </Text>
          <TouchableOpacity
            style={styles.item}
            onPress={openBrightonWebsite}
            accessibilityRole="link"
            accessibilityLabel="Brighton Website"
          >
            <IconSymbol name="globe" size={24} color={iconColor} />
            <Text style={[styles.label, { color: textColor }]}>
              Brighton Website
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleNavigate("/privacy")}
            accessibilityRole="button"
            accessibilityLabel="Privacy"
          >
            <IconSymbol name="lock.shield.fill" size={24} color={iconColor} />
            <Text style={[styles.label, { color: textColor }]}>Privacy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleNavigate("/terms")}
            accessibilityRole="button"
            accessibilityLabel="Terms & Conditions"
          >
            <IconSymbol name="doc.text.fill" size={24} color={iconColor} />
            <Text style={[styles.label, { color: textColor }]}>
              Terms & Conditions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    height: DRAWER_HEADER_HEIGHT,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  drawerLottie: {
    width: 120,
    height: 120,
  },
  contentWrapper: {
    flex: 1,
    minHeight: 0,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  pinnedSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
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
