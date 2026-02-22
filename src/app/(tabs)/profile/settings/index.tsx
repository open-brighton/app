import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";

import { HStack } from "@/components/HStack";
import { NotificationTest } from "@/components/NotificationTest";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import config from "@/constants/config";
import { useColorScheme } from "@/hooks/useColorScheme";

export function SettingsScreen() {
  const { ENVIRONMENT, APP_VERSION, BUILD_NUMBER, BUNDLE_IDENTIFIER } = config;
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showNotificationTest, setShowNotificationTest] = useState(false);
  const { colorScheme, setColorScheme } = useColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const toggleNotificationTest = () => {
    setShowNotificationTest(!showNotificationTest);
  };

  return (
    <ThemedSafeAreaView>
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

            <ThemedView style={styles.item}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={toggleNotificationTest}
              >
                <HStack gap={10}>
                  <ThemedText type="defaultSemiBold">
                    {showNotificationTest ? "Hide" : "Show"} Notification Test
                  </ThemedText>
                  <IconSymbol
                    size={16}
                    name="chevron.right"
                    color={Colors.light.primary}
                  />
                </HStack>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>

          {/* Notification Test Section */}
          {showNotificationTest && (
            <ThemedView style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Notification Test
              </ThemedText>
              <NotificationTest />
            </ThemedView>
          )}

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Information
            </ThemedText>

            <ThemedView style={styles.item}>
              <Link href="/feedback" asChild>
                <TouchableOpacity style={{ flex: 1 }}>
                  <HStack gap={10}>
                    <ThemedText type="defaultSemiBold">
                      Submit Feedback
                    </ThemedText>
                    <IconSymbol
                      size={16}
                      name="chevron.right"
                      color={Colors.light.primary}
                    />
                  </HStack>
                </TouchableOpacity>
              </Link>
            </ThemedView>

            <ThemedView style={styles.item}>
              <Link href="/contact" asChild>
                <TouchableOpacity style={{ flex: 1 }}>
                  <HStack gap={10}>
                    <ThemedText type="defaultSemiBold">Contact</ThemedText>
                    <IconSymbol
                      size={16}
                      name="chevron.right"
                      color={Colors.light.primary}
                    />
                  </HStack>
                </TouchableOpacity>
              </Link>
            </ThemedView>

            <ThemedView style={styles.item}>
              <Link href="/about" asChild>
                <TouchableOpacity style={{ flex: 1 }}>
                  <HStack gap={10}>
                    <ThemedText type="defaultSemiBold">About</ThemedText>
                    <IconSymbol
                      size={16}
                      name="chevron.right"
                      color={Colors.light.primary}
                    />
                  </HStack>
                </TouchableOpacity>
              </Link>
            </ThemedView>

            <ThemedView style={styles.item}>
              <Link href="/donate" asChild>
                <TouchableOpacity style={{ flex: 1 }}>
                  <HStack gap={10}>
                    <ThemedText type="defaultSemiBold">Donate</ThemedText>
                    <IconSymbol
                      size={16}
                      name="chevron.right"
                      color={Colors.light.primary}
                    />
                  </HStack>
                </TouchableOpacity>
              </Link>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              App Details
            </ThemedText>

            <ThemedView style={styles.item}>
              <ThemedText type="defaultSemiBold">App Version</ThemedText>
              <ThemedText>{APP_VERSION}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.item}>
              <ThemedText type="defaultSemiBold">Environment</ThemedText>
              <ThemedText>{ENVIRONMENT}</ThemedText>
            </ThemedView>
            {BUILD_NUMBER && (
              <ThemedView style={styles.item}>
                <ThemedText type="defaultSemiBold">Build Number</ThemedText>
                <ThemedText>{BUILD_NUMBER}</ThemedText>
              </ThemedView>
            )}
            {BUNDLE_IDENTIFIER && (
              <ThemedView style={styles.item}>
                <ThemedText type="defaultSemiBold">Bundle ID</ThemedText>
                <ThemedText>{BUNDLE_IDENTIFIER}</ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedSafeAreaView>
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

export default SettingsScreen;
