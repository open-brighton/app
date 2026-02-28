import { gql } from "@apollo/client";
import React from "react";
import { StyleSheet } from "react-native";

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
  }
`;

export type FeedCard_feedItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
};

type Props = { feedItem: FeedCard_feedItem };

export function FeedCard({ feedItem }: Props) {
  return (
    <Card imageArea={<CardImagePlaceholder icon="image" />} onPress={() => {}}>
      <ThemedText type="subtitle" style={styles.title}>
        {feedItem.title}
      </ThemedText>
      <ThemedText style={styles.description}>{feedItem.description}</ThemedText>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 2,
  },
  description: {
    opacity: 0.8,
  },
});
