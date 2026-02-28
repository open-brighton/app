import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { Card } from "@/components/Card";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

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
          <MaterialIcons name="storefront" size={40} color={iconColor} />
        </View>
      }
      onPress={() => {}}
    >
      <ThemedText type="subtitle" style={styles.cardName}>
        {name}
      </ThemedText>
      <ThemedText style={styles.cardCategory}>{category}</ThemedText>
      <ThemedText style={styles.cardAddress}>{address}</ThemedText>
    </Card>
  );
}

export const LocalBusinessScreen = () => {
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
  cardImagePlaceholder: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
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
