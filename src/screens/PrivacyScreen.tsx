import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { VStack } from "@/components/VStack";

export const PrivacyScreen = () => {
  return (
    <ThemedSafeAreaView>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <VStack container gap={16}>
          <ThemedText type="subtitle">Overview</ThemedText>
          <ThemedText>
            Open Brighton is an open source, community-run app. This policy
            describes what data we collect and how we use it. We aim to keep
            data use minimal and transparent.
          </ThemedText>

          <ThemedText type="subtitle">Data we collect</ThemedText>
          <ThemedText>
            We may collect usage data (e.g. app version, device type) to improve
            the app. If you use the contact or feedback forms, we receive the
            information you submit (e.g. name, email, message) so we can
            respond. We do not sell your data.
          </ThemedText>

          <ThemedText type="subtitle">How we use it</ThemedText>
          <ThemedText>
            Data is used to operate and improve the app, respond to inquiries,
            and comply with the law where required.
          </ThemedText>

          <ThemedText type="subtitle">Third parties</ThemedText>
          <ThemedText>
            The app may use third-party services (e.g. hosting, maps, analytics).
            Their privacy policies apply to data they process. We choose
            providers with reasonable privacy practices where possible.
          </ThemedText>

          <ThemedText type="subtitle">Open source</ThemedText>
          <ThemedText>
            The app and much of its infrastructure are open source. You can
            inspect how the app works and what data it sends by reviewing the
            code.
          </ThemedText>

          <ThemedText type="subtitle">Contact</ThemedText>
          <ThemedText>
            Questions about privacy? Use the contact form in the app or reach
            out via the project’s public channels.
          </ThemedText>

          <ThemedText style={styles.footer}>
            Last updated: [Date]. This is a stub; have a qualified professional
            review before relying on it legally.
          </ThemedText>
        </VStack>
      </ScrollView>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingTop: 16, paddingBottom: 48 },
  footer: {
    marginTop: 8,
    fontStyle: "italic",
    opacity: 0.9,
  },
});

export default PrivacyScreen;
