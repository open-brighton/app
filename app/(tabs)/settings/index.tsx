import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import VStack from "@/components/VStack";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useConfig } from "@/hooks/useConfig";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { environment, appVersion, buildNumber, bundleIdentifier } =
    useConfig();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { colorScheme, setColorScheme } = useColorScheme();

  const handleShowSplash = () => {
    router.push("/splash");
  };

  const handleGoToContact = () => {
    router.push("/contact");
  };

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.background }}>
      <ScrollView style={styles.container}>
        <ThemedView>
          <ThemedText type="title" style={styles.title}>
            Settings
          </ThemedText>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              App Settings
            </ThemedText>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <ThemedText type="defaultSemiBold">Dark Mode</ThemedText>
                <ThemedText type="default">
                  {colorScheme === "dark" ? "On" : "Off"}
                </ThemedText>
              </View>
              <Switch
                value={colorScheme === "dark"}
                onValueChange={toggleColorScheme}
                trackColor={{ false: "#767577", true: Colors.light.tint }}
                thumbColor={colorScheme === "dark" ? "#f4f3f4" : "#f4f3f4"}
              />
            </View>
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Notifications
            </ThemedText>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <ThemedText type="defaultSemiBold">
                  Push Notifications
                </ThemedText>
                <ThemedText type="default">
                  {notificationsEnabled ? "On" : "Off"}
                </ThemedText>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={toggleNotifications}
                trackColor={{ false: "#767577", true: Colors.light.tint }}
                thumbColor={notificationsEnabled ? "#f4f3f4" : "#f4f3f4"}
              />
            </View>
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              App Info
            </ThemedText>

            <ThemedView style={styles.item}>
              <ThemedText type="defaultSemiBold">App Version:</ThemedText>
              <ThemedText>{appVersion}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.item}>
              <ThemedText type="defaultSemiBold">Environment:</ThemedText>
              <ThemedText>{environment}</ThemedText>
            </ThemedView>
            {buildNumber && (
              <ThemedView style={styles.item}>
                <ThemedText type="defaultSemiBold">Build Number:</ThemedText>
                <ThemedText>{buildNumber}</ThemedText>
              </ThemedView>
            )}
            {bundleIdentifier && (
              <ThemedView style={styles.item}>
                <ThemedText type="defaultSemiBold">Bundle ID:</ThemedText>
                <ThemedText>{bundleIdentifier}</ThemedText>
              </ThemedView>
            )}
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Debug
            </ThemedText>
            <VStack>
              <TouchableOpacity
                style={styles.button}
                onPress={handleShowSplash}
                activeOpacity={0.7}
              >
                <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                  Show Splash Screen
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handleGoToContact}
                activeOpacity={0.7}
              >
                <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                  Go to Contact Screen
                </ThemedText>
              </TouchableOpacity>
            </VStack>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    marginBottom: 10,
  },
  settingInfo: {
    flex: 1,
  },
});
