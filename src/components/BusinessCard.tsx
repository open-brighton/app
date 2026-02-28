import { gql } from "@apollo/client";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet } from "react-native";

import { Card } from "@/components/Card";
import { CardImagePlaceholder } from "@/components/CardImagePlaceholder";
import { ThemedText } from "@/components/ThemedText";

export const BUSINESS_CARD_FRAGMENT = gql`
  fragment BusinessCard_business on Business {
    id
    slug
    name
    category
    address
    imageUrl
  }
`;

export type BusinessCard_business = {
  id: string;
  slug: string;
  name: string;
  category: string;
  address: string;
  imageUrl?: string | null;
};

type Props = { business: BusinessCard_business };

export function BusinessCard({ business }: Props) {
  const imageArea = business.imageUrl
    ? <Image source={{ uri: business.imageUrl }} style={styles.image} />
    : <CardImagePlaceholder icon="storefront" />;

  return (
    <Card
      imageArea={imageArea}
      onPress={() => router.push(`/local-business/${business.slug}`)}
    >
      <ThemedText type="subtitle" style={styles.name}>
        {business.name}
      </ThemedText>
      <ThemedText style={styles.category}>{business.category}</ThemedText>
      <ThemedText style={styles.address}>{business.address}</ThemedText>
    </Card>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 120,
  },
  name: {
    marginBottom: 2,
  },
  category: {
    opacity: 0.7,
    fontSize: 13,
  },
  address: {
    opacity: 0.55,
    fontSize: 12,
    marginTop: 2,
  },
});
