import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { LottieAnimation } from "@/components/LottieAnimation";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { VStack } from "@/components/VStack";

export const AboutScreen = () => {
  const router = useRouter();
  return (
    <ThemedSafeAreaView>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.lottieContainer}>
          <LottieAnimation autoPlay loop style={styles.lottie} />
        </View>
        <VStack container gap={16}>
          <ThemedText type="subtitle">Independent & community‑driven</ThemedText>
          <ThemedText>
            Open Brighton is not affiliated with the Town of Brighton or any local
            government. This app is a labor of love for the community—built and
            maintained by a resident, not by the town. I don’t get paid for this;
            it’s volunteer work to make Brighton easier to explore and engage
            with.
          </ThemedText>

          <ThemedText type="subtitle">Why open source Brighton matters</ThemedText>
          <ThemedText>
            When civic tools are open source, the community can see how they
            work, suggest improvements, and reuse them. That means more
            transparency, less lock‑in to a single vendor, and the chance for
            other towns to learn from and build on what works here. Open Brighton
            aims to be a small, durable layer that helps people connect with
            Brighton’s places and services in ways that fit how we actually use
            our phones and the web today.
          </ThemedText>

          <ThemedText type="subtitle">Modern ways to interact with town life</ThemedText>
          <ThemedText>
            Towns run on information: events, parks, services, and how to get
            involved. Too often that lives in PDFs, old websites, or scattered
            pages that don’t work well on mobile. Open Brighton is built on
            modern, open “rails”—APIs, clear data, and a simple app—so you can
            find what you need quickly and in one place. This is a supplement to
            official town resources, not a replacement. Good digital touchpoints
            don’t replace in‑person community; they make it easier to discover
            and participate in it.
          </ThemedText>

          <ThemedText>
            If you’re enjoying Open Brighton, consider{" "}
            <ThemedText
              type="link"
              onPress={() => router.push("/donate")}
              accessibilityRole="link"
              accessibilityLabel="Go to donate page"
            >
              donating
            </ThemedText>{" "}
            to help keep the project going. Donations help cover Apple Store fees
            and hosting costs—currently paid out of pocket.
          </ThemedText>

          <ThemedText>
            If you have feature ideas or improvements, please submit them via
            the{" "}
            <ThemedText
              type="link"
              onPress={() => router.push("/feedback")}
              accessibilityRole="link"
              accessibilityLabel="Go to feedback form"
            >
              feedback form
            </ThemedText>
            ; for anything else, reach out via the{" "}
            <ThemedText
              type="link"
              onPress={() => router.push("/contact")}
              accessibilityRole="link"
              accessibilityLabel="Go to contact form"
            >
              contact form
            </ThemedText>
            .
          </ThemedText>

          <ThemedText style={styles.footer}>
            Thanks for using Open Brighton—we’d love to hear from you.
          </ThemedText>
        </VStack>
      </ScrollView>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingTop: 8, paddingBottom: 48 },
  lottieContainer: {
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  lottie: {
    width: 140,
    height: 140,
  },
  footer: {
    marginTop: 8,
    fontStyle: "italic",
    opacity: 0.9,
  },
});

export default AboutScreen;
