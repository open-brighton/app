import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, View } from "react-native";

import { SettingsRow } from "@/components/SettingsRow";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import config from "@/constants/config";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";

export function SettingsScreen() {
  const { ENVIRONMENT, APP_VERSION, BUILD_NUMBER, BUNDLE_IDENTIFIER } = config;
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { colorScheme, setColorScheme } = useColorScheme();
  const router = useRouter();

  const switchTrack = useThemeColor({}, "switchTrack");
  const itemBg = useThemeColor({}, "itemBackground");

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <ThemedSafeAreaView>
      <ScrollView style={styles.container}>
        <ThemedView>
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              App Settings
            </ThemedText>
            <ThemedView style={[styles.settingItem, { backgroundColor: itemBg }]}>
              <View style={styles.settingInfo}>
                <ThemedText type="defaultSemiBold">Dark Mode</ThemedText>
                <ThemedText>{colorScheme === "dark" ? "On" : "Off"}</ThemedText>
              </View>
              <Switch
                value={colorScheme === "dark"}
                onValueChange={toggleColorScheme}
                trackColor={{ false: switchTrack, true: Colors.light.tint }}
                thumbColor="#f4f3f4"
              />
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Notifications
            </ThemedText>
            <ThemedView style={[styles.settingItem, { backgroundColor: itemBg }]}>
              <View style={styles.settingInfo}>
                <ThemedText type="defaultSemiBold">Push Notifications</ThemedText>
                <ThemedText>{notificationsEnabled ? "On" : "Off"}</ThemedText>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: switchTrack, true: Colors.light.tint }}
                thumbColor="#f4f3f4"
              />
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Information
            </ThemedText>
            <SettingsRow label="Submit Feedback" onPress={() => router.push("/feedback")} />
            <SettingsRow label="Contact" onPress={() => router.push("/contact")} />
            <SettingsRow label="About" onPress={() => router.push("/about")} />
            <SettingsRow label="Donate" onPress={() => router.push("/donate")} />
          </ThemedView>

          {__DEV__ && (
            <ThemedView style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Development
              </ThemedText>
              <SettingsRow label="Debug" onPress={() => router.push("/settings/debug")} />
            </ThemedView>
          )}

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              App Details
            </ThemedText>
            <SettingsRow label="App Version" value={APP_VERSION} />
            <SettingsRow label="Environment" value={ENVIRONMENT} />
            {BUILD_NUMBER && <SettingsRow label="Build Number" value={BUILD_NUMBER} />}
            {BUNDLE_IDENTIFIER && (
              <SettingsRow label="Bundle ID" value={BUNDLE_IDENTIFIER} />
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
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  settingInfo: {
    flex: 1,
  },
});

export default SettingsScreen;
