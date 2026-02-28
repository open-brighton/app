import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { Card } from "@/components/Card";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const EVENT_CARDS = [
  {
    id: "1",
    title: "Brighton Food Festival",
    date: "Sat 7 Mar · 10:00 – 18:00",
    location: "New Road, Brighton",
  },
  {
    id: "2",
    title: "Open Mic Night",
    date: "Fri 13 Mar · 19:30",
    location: "The Haunt, Pool Valley",
  },
  {
    id: "3",
    title: "Beach Clean-Up",
    date: "Sun 15 Mar · 09:00 – 12:00",
    location: "Brighton Beach, West Pier",
  },
  {
    id: "4",
    title: "Council Budget Consultation",
    date: "Wed 18 Mar · 18:00 – 20:00",
    location: "Hove Town Hall",
  },
  {
    id: "5",
    title: "Brighton Half Marathon",
    date: "Sun 22 Mar · 09:30",
    location: "Madeira Drive, Seafront",
  },
] as const;

function EventCard({
  title,
  date,
  location,
}: { title: string; date: string; location: string }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? Colors.dark.icon : Colors.light.icon;
  const placeholderBg = isDark
    ? "rgba(155, 161, 166, 0.25)"
    : "rgba(104, 112, 118, 0.2)";

  return (
    <Card
      imageArea={
        <View style={[styles.cardImagePlaceholder, { backgroundColor: placeholderBg }]}>
          <MaterialIcons name="event" size={40} color={iconColor} />
        </View>
      }
      onPress={() => {}}
    >
      <ThemedText type="subtitle" style={styles.cardTitle}>
        {title}
      </ThemedText>
      <ThemedText style={styles.cardDate}>{date}</ThemedText>
      <ThemedText style={styles.cardLocation}>{location}</ThemedText>
    </Card>
  );
}

export const EventsScreen = () => {
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
        {EVENT_CARDS.map((card) => (
          <EventCard
            key={card.id}
            title={card.title}
            date={card.date}
            location={card.location}
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
  cardDate: {
    opacity: 0.7,
    fontSize: 13,
  },
  cardLocation: {
    opacity: 0.55,
    fontSize: 12,
    marginTop: 2,
  },
});

export default EventsScreen;
