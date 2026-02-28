import React from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

import { Card } from "@/components/Card";
import { CardImagePlaceholder } from "@/components/CardImagePlaceholder";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { useRefresh } from "@/hooks/useRefresh";
import { useThemeColor } from "@/hooks/useThemeColor";

const BUSINESS_CARDS = [
  {
    id: "1",
    name: "The Flour Pot Bakery",
    category: "Bakery · Café",
    address: "40 Sydney St, North Laine",
  },
  {
    id: "2",
    name: "Choccywoccydoodah",
    category: "Chocolatier · Gift Shop",
    address: "24 Duke St, Brighton",
  },
  {
    id: "3",
    name: "Snoopers Paradise",
    category: "Vintage · Antiques",
    address: "7-8 Kensington Gardens",
  },
  {
    id: "4",
    name: "Infinity Foods",
    category: "Health Food · Organic",
    address: "25 North Rd, Brighton",
  },
  {
    id: "5",
    name: "Brighton Fishing Museum",
    category: "Museum · Heritage",
    address: "201 King's Rd Arches",
  },
] as const;

function BusinessCard({
  name,
  category,
  address,
}: { name: string; category: string; address: string }) {
  return (
    <Card imageArea={<CardImagePlaceholder icon="storefront" />} onPress={() => {}}>
      <ThemedText type="subtitle" style={styles.cardName}>
        {name}
      </ThemedText>
      <ThemedText style={styles.cardCategory}>{category}</ThemedText>
      <ThemedText style={styles.cardAddress}>{address}</ThemedText>
    </Card>
  );
}

export const LocalBusinessScreen = () => {
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
        {BUSINESS_CARDS.map((card) => (
          <BusinessCard
            key={card.id}
            name={card.name}
            category={card.category}
            address={card.address}
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
  cardName: {
    marginBottom: 2,
  },
  cardCategory: {
    opacity: 0.7,
    fontSize: 13,
  },
  cardAddress: {
    opacity: 0.55,
    fontSize: 12,
    marginTop: 2,
  },
});

export default LocalBusinessScreen;
