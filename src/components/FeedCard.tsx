import { gql } from "@apollo/client";
import React from "react";
import { Image, StyleSheet } from "react-native";

import { Card } from "@/components/Card";
import { CardImagePlaceholder } from "@/components/CardImagePlaceholder";
import { ThemedText } from "@/components/ThemedText";

export const FEED_CARD_FRAGMENT = gql`
  fragment FeedCard_feedItem on FeedItem {
    id
    title
    description
    category
    date
    imageUrl
  }
`;

export type FeedCard_feedItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  imageUrl?: string | null;
};

type Props = { feedItem: FeedCard_feedItem };

export function FeedCard({ feedItem }: Props) {
  const imageArea = feedItem.imageUrl
    ? <Image source={{ uri: feedItem.imageUrl }} style={styles.image} />
    : <CardImagePlaceholder icon="image" />;

  return (
    <Card imageArea={imageArea} onPress={() => {}}>
      <ThemedText type="subtitle" style={styles.title}>
        {feedItem.title}
      </ThemedText>
      <ThemedText style={styles.description}>{feedItem.description}</ThemedText>
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
  description: {
    opacity: 0.8,
  },
});
