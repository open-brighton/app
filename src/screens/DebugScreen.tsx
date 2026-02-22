import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { HStack } from "@/components/HStack";
import { NotificationTest } from "@/components/NotificationTest";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import config from "@/constants/config";
import { NUX_REGISTRY } from "@/constants/nux";

export default function DebugScreen() {
  const [showNotificationTest, setShowNotificationTest] = useState(false);

  if (!__DEV__) {
    return (
      <ThemedSafeAreaView>
        <ThemedView style={styles.container}>
          <ThemedText type="subtitle">
            Debug menu is only available in development builds.
          </ThemedText>
        </ThemedView>
      </ThemedSafeAreaView>
    );
  }

  return (
    <ThemedSafeAreaView>
      <ScrollView style={styles.container}>
        <ThemedView>
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Build info
            </ThemedText>
            <ThemedView style={styles.item}>
              <ThemedText type="defaultSemiBold">Environment</ThemedText>
              <ThemedText>{config.ENVIRONMENT}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.item}>
              <ThemedText type="defaultSemiBold">__DEV__</ThemedText>
              <ThemedText>{String(__DEV__)}</ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Notification test
            </ThemedText>
            <ThemedView style={styles.item}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => setShowNotificationTest(!showNotificationTest)}
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
            {showNotificationTest && (
              <ThemedView style={styles.notificationTest}>
                <NotificationTest />
              </ThemedView>
            )}
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Guides
            </ThemedText>
            {NUX_REGISTRY.map((nux) => (
              <ThemedView key={nux.slug} style={styles.item}>
                <Link href={`/guide/${nux.slug}`} asChild>
                  <TouchableOpacity style={{ flex: 1 }}>
                    <HStack gap={10}>
                      <ThemedText type="defaultSemiBold">{nux.title}</ThemedText>
                      <IconSymbol
                        size={16}
                        name="chevron.right"
                        color={Colors.light.primary}
                      />
                    </HStack>
                  </TouchableOpacity>
                </Link>
              </ThemedView>
            ))}
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Development tools
            </ThemedText>
            <ThemedText type="default" style={styles.placeholder}>
              Add more debug actions here (e.g. clear cache, reset NUX, feature flags).
            </ThemedText>
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
  placeholder: {
    opacity: 0.7,
  },
  notificationTest: {
    marginTop: 10,
  },
});
