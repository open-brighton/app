import Constants from "expo-constants";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

export const options = {
  title: "Debug",
};

export default function DebugScreen() {
  const appVersion = Constants.expoConfig?.version || "1.0.0";

  const handleShowSplash = () => {
    router.push("/splash");
  };

  const handleGoToContact = () => {
    router.push("/contact");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.background }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Settings
        </ThemedText>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            App Info
          </ThemedText>

          <ThemedView style={styles.item}>
            <ThemedText type="defaultSemiBold">App Version:</ThemedText>
            <ThemedText>{appVersion}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Debug Actions
          </ThemedText>

          <TouchableOpacity
            style={styles.button}
            onPress={handleShowSplash}
            activeOpacity={0.7}
          >
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              Show Splash Screen
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Navigation
          </ThemedText>

          <TouchableOpacity
            style={styles.button}
            onPress={handleGoToContact}
            activeOpacity={0.7}
          >
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              Go to Contact Screen
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
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
});
