import { gql } from "@apollo/client";
import React from "react";
import { Image, StyleSheet } from "react-native";

import { Card } from "@/components/Card";
import { CardImagePlaceholder } from "@/components/CardImagePlaceholder";
import { ThemedText } from "@/components/ThemedText";

export const EVENT_CARD_FRAGMENT = gql`
  fragment EventCard_event on Event {
    id
    title
    date
    location
    category
    imageUrl
  }
`;

export type EventCard_event = {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  imageUrl?: string | null;
};

type Props = { event: EventCard_event };

export function EventCard({ event }: Props) {
  const imageArea = event.imageUrl
    ? <Image source={{ uri: event.imageUrl }} style={styles.image} />
    : <CardImagePlaceholder icon="event" />;

  return (
    <Card imageArea={imageArea} onPress={() => {}}>
      <ThemedText type="subtitle" style={styles.title}>
        {event.title}
      </ThemedText>
      <ThemedText style={styles.date}>{event.date}</ThemedText>
      <ThemedText style={styles.location}>{event.location}</ThemedText>
    </Card>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 120,
  },
  title: {
    marginBottom: 2,
  },
  date: {
    opacity: 0.7,
    fontSize: 13,
  },
  location: {
    opacity: 0.55,
    fontSize: 12,
    marginTop: 2,
  },
});
