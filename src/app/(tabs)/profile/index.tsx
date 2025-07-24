import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";

export function ProfileScreen() {
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
            Profile
          </ThemedText>
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
});

export default ProfileScreen;
