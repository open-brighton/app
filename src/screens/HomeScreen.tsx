import React from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { Card } from "@/components/Card";
import { CardImagePlaceholder } from "@/components/CardImagePlaceholder";
import { HelloWave } from "@/components/HelloWave";
import { LottieAnimation } from "@/components/LottieAnimation";
import { ParallaxScrollView } from "@/components/ParallaxScrollView";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useRefresh } from "@/hooks/useRefresh";
import { useThemeColor } from "@/hooks/useThemeColor";

/** Parallax + welcome content for NUX (e.g. welcome step). */
export function HomeParallaxContent({
  extraPaddingBottom,
}: { extraPaddingBottom?: number } = {}) {
  return (
    <ParallaxScrollView
      extraPaddingBottom={extraPaddingBottom}
      headerBackgroundColor={{
        light: Colors.light.background,
        dark: Colors.dark.background,
      }}
      headerImage={
        <View style={nuxStyles.reactLogo}>
          <LottieAnimation autoPlay loop style={nuxStyles.lottie} />
        </View>
      }
    >
      <ThemedView style={nuxStyles.titleContainer}>
        <ThemedText type="title">Welcome to Open Brighton!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={nuxStyles.stepContainer}>
        <ThemedText type="subtitle">Discover your town</ThemedText>
        <ThemedText>
          Browse local events, businesses, and community resources — all in one place.
        </ThemedText>
      </ThemedView>
      <ThemedView style={nuxStyles.stepContainer}>
        <ThemedText type="subtitle">Explore the map</ThemedText>
        <ThemedText>
          Tap the Explore tab to see what's happening around Brighton.
        </ThemedText>
      </ThemedView>
      <ThemedView style={nuxStyles.stepContainer}>
        <ThemedText type="subtitle">Ask the assistant</ThemedText>
        <ThemedText>
          Use the Chat tab to ask questions about Brighton — events, parking, services, and more.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const FEED_CARDS = [
  { id: "1", title: "Library Event", subtitle: "Story time & activities" },
  { id: "2", title: "Town Hall Meeting", subtitle: "Community discussion" },
  { id: "3", title: "Bulk Yard Pickup", subtitle: "Curbside collection dates" },
] as const;

function FeedCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Card imageArea={<CardImagePlaceholder icon="image" />} onPress={() => {}}>
      <ThemedText type="subtitle" style={styles.cardTitle}>
        {title}
      </ThemedText>
      <ThemedText style={styles.cardSubtitle}>{subtitle}</ThemedText>
    </Card>
  );
}

export const HomeScreen = () => {
  const tint = useThemeColor({}, "tint");
  const { refreshing, onRefresh } = useRefresh();

  return (
    <ThemedSafeAreaView>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={tint}
            colors={[tint]}
          />
        }
      >
        {FEED_CARDS.map((card) => (
          <FeedCard key={card.id} title={card.title} subtitle={card.subtitle} />
        ))}
      </ScrollView>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  cardTitle: {
    marginBottom: 2,
  },
  cardSubtitle: {
    opacity: 0.8,
  },
});

const nuxStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: "100%",
    height: "100%",
  },
});

export default HomeScreen;
