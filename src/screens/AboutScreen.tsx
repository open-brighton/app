import { useRouter } from "expo-router";
import React from "react";
import { Linking, ScrollView, StyleSheet, View } from "react-native";

import { Card } from "@/components/Card";
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

          <ThemedText type="subtitle" style={styles.heading}>What is Open Brighton?</ThemedText>
          <ThemedText style={styles.body}>
            Open Brighton is a free app that makes it easier to explore
            Brighton&apos;s parks, events, and services — all in one place. It&apos;s
            built for residents and visitors who want a simple, mobile-friendly
            way to connect with town life.
          </ThemedText>

          <ThemedText type="subtitle" style={styles.heading}>Independent & community-driven</ThemedText>
          <ThemedText style={styles.body}>
            This app is not affiliated with the Town of Brighton or any local
            government. It&apos;s a labor of love — built and maintained by a
            resident, on volunteer time, with no pay. Donations help cover App
            Store fees and hosting costs currently paid out of pocket.
          </ThemedText>

          <ThemedText type="subtitle" style={styles.heading}>Open source & built to last</ThemedText>
          <ThemedText style={styles.body}>
            Open Brighton is open source so the community can see how it works,
            suggest improvements, and build on it. The goal is a small, durable
            tool that supplements — not replaces — official town resources.
          </ThemedText>

          <ThemedText type="subtitle" style={styles.heading}>Roadmap</ThemedText>
          <ThemedText style={styles.body}>{"• Automate content retrieval from various sources.\n• Launch on App Store / Play Store\n• Community Outreach"}</ThemedText>

          <ThemedText type="subtitle" style={styles.heading}>Get involved</ThemedText>

          <Card onPress={() => router.push("/donate")}>
            <ThemedText type="defaultSemiBold">Support the project</ThemedText>
            <ThemedText>Help cover App Store fees and hosting costs.</ThemedText>
          </Card>

          <Card onPress={() => router.push("/feedback")}>
            <ThemedText type="defaultSemiBold">Share feedback</ThemedText>
            <ThemedText>Have a feature idea or improvement? Let us know.</ThemedText>
          </Card>

          <Card onPress={() => router.push("/contact")}>
            <ThemedText type="defaultSemiBold">Get in touch</ThemedText>
            <ThemedText>Reach out with anything else on your mind.</ThemedText>
          </Card>

          <Card onPress={() => Linking.openURL("https://github.com/open-brighton")}>
            <ThemedText type="defaultSemiBold">Are you a software developer?</ThemedText>
            <ThemedText>Want to help maintain or write software for your community? Feel free to contribute at github.com/open-brighton</ThemedText>
          </Card>

        </VStack>
      </ScrollView>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingTop: 16, paddingBottom: 48 },
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
  body: {
    textAlign: "center",
  },
  heading: {
    textAlign: "center",
  },

});

export default AboutScreen;
