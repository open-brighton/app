import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useCallback, useState } from "react";
import { Platform, RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { Card } from "@/components/Card";
import { HelloWave } from "@/components/HelloWave";
import { LottieAnimation } from "@/components/LottieAnimation";
import { ParallaxScrollView } from "@/components/ParallaxScrollView";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

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
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={nuxStyles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">screens/HomeScreen.tsx</ThemedText> to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m", web: "F12" })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={nuxStyles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>{`Tap the Explore tab to learn more about what's included in this starter app.`}</ThemedText>
      </ThemedView>
      <ThemedView style={nuxStyles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
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

function FeedCard({
  title,
  subtitle,
}: { title: string; subtitle: string }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? Colors.dark.icon : Colors.light.icon;
  const placeholderBg = isDark
    ? "rgba(155, 161, 166, 0.25)"
    : "rgba(104, 112, 118, 0.2)";
  const imageArea = (
    <View
      style={[styles.cardImagePlaceholder, { backgroundColor: placeholderBg }]}
    >
      <MaterialIcons name="image" size={40} color={iconColor} />
    </View>
  );
  return (
    <Card
      imageArea={imageArea}
      onPress={() => {}}
    >
      <ThemedText type="subtitle" style={styles.cardTitle}>
        {title}
      </ThemedText>
      <ThemedText style={styles.cardSubtitle}>{subtitle}</ThemedText>
    </Card>
  );
}

export const HomeScreen = () => {
  const { colorScheme } = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

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
            tintColor={colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint}
            colors={[colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint]}
          />
        }
      >
        {FEED_CARDS.map((card) => (
          <FeedCard
            key={card.id}
            title={card.title}
            subtitle={card.subtitle}
          />
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
  cardImagePlaceholder: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
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
