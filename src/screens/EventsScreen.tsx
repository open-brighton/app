import React from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

import { Card } from "@/components/Card";
import { CardImagePlaceholder } from "@/components/CardImagePlaceholder";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { useRefresh } from "@/hooks/useRefresh";
import { useThemeColor } from "@/hooks/useThemeColor";

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
  return (
    <Card imageArea={<CardImagePlaceholder icon="event" />} onPress={() => {}}>
      <ThemedText type="subtitle" style={styles.cardTitle}>
        {title}
      </ThemedText>
      <ThemedText style={styles.cardDate}>{date}</ThemedText>
      <ThemedText style={styles.cardLocation}>{location}</ThemedText>
    </Card>
  );
}

export const EventsScreen = () => {
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
