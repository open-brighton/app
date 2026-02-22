import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { VStack } from "@/components/VStack";

export const TermsScreen = () => {
  return (
    <ThemedSafeAreaView>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <VStack container gap={16}>
          <ThemedText type="subtitle">Acceptance</ThemedText>
          <ThemedText>
            By using Open Brighton, you agree to these terms. If you don’t
            agree, please don’t use the app.
          </ThemedText>

          <ThemedText type="subtitle">Use of the app</ThemedText>
          <ThemedText>
            Open Brighton is provided to help you explore and engage with
            Brighton-related information. Use it in good faith. Don’t use it for
            anything illegal, harmful, or that violates others’ rights. The app
            supplements—and does not replace—official town resources; rely on
            the town’s official channels for official matters.
          </ThemedText>

          <ThemedText type="subtitle">No warranty</ThemedText>
          <ThemedText>
            The app is provided “as is.” We don’t guarantee that it’s
            error-free, complete, or suitable for any particular purpose. Use it
            at your own risk.
          </ThemedText>

          <ThemedText type="subtitle">Limitation of liability</ThemedText>
          <ThemedText>
            To the extent permitted by law, Open Brighton and its maintainers are
            not liable for any damages arising from your use of the app or
            reliance on its content. This is a community project, not an official
            town service.
          </ThemedText>

          <ThemedText type="subtitle">Open source</ThemedText>
          <ThemedText>
            Parts of the app are open source under their respective licenses.
            Your use of the app may also be subject to those licenses where
            applicable.
          </ThemedText>

          <ThemedText type="subtitle">Changes</ThemedText>
          <ThemedText>
            We may update these terms from time to time. Continued use of the
            app after changes constitutes acceptance of the updated terms. We
            encourage you to check this page periodically.
          </ThemedText>

          <ThemedText type="subtitle">Contact</ThemedText>
          <ThemedText>
            Questions about these terms? Use the contact form in the app or
            reach out via the project’s public channels.
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
  content: { paddingVertical: 24, paddingBottom: 48 },
  footer: {
    marginTop: 8,
    fontStyle: "italic",
    opacity: 0.9,
  },
});

export default TermsScreen;
