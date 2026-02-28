import { gql, useQuery } from "@apollo/client";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Map } from "@/components/Map";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const GET_BUSINESS = gql`
  query GetBusiness($slug: String!) {
    business(slug: $slug) {
      id
      slug
      name
      category
      address
      description
      longitude
      latitude
      accentColor
    }
  }
`;

type BusinessDetail = {
  id: string;
  slug: string;
  name: string;
  category: string;
  address: string;
  description: string;
  longitude: number;
  latitude: number;
  accentColor: string;
};

type GetBusinessData = { business: BusinessDetail | null };
type GetBusinessVars = { slug: string };

const MAP_HEIGHT = 220;

export function LocalBusinessDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const { data, loading, error } = useQuery<GetBusinessData, GetBusinessVars>(GET_BUSINESS, {
    variables: { slug },
    skip: !slug,
  });

  const iconColor = isDark ? Colors.dark.icon : Colors.light.icon;
  const subtleText = isDark ? "rgba(236,237,238,0.6)" : "rgba(17,24,28,0.55)";

  if (loading) {
    return (
      <ThemedSafeAreaView style={styles.centered}>
        <ActivityIndicator />
      </ThemedSafeAreaView>
    );
  }

  if (error || !data?.business) {
    return (
      <ThemedSafeAreaView edges={["top", "left", "right", "bottom"]}>
        <View style={styles.notFound}>
          <ThemedText type="subtitle">Business not found</ThemedText>
        </View>
      </ThemedSafeAreaView>
    );
  }

  const business = data.business;
  const coordinates: [number, number] = [business.longitude, business.latitude];

  return (
    <View style={styles.root}>
      {/* Hero header – extends behind status bar */}
      <View
        style={[
          styles.hero,
          { backgroundColor: business.accentColor, paddingTop: insets.top },
        ]}
      >
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <MaterialIcons
          name="storefront"
          size={80}
          color="rgba(255,255,255,0.85)"
        />
      </View>

      {/* Scrollable content */}
      <ThemedSafeAreaView edges={["left", "right", "bottom"]} style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Business name & category */}
          <ThemedText type="title" style={styles.name}>
            {business.name}
          </ThemedText>
          <View style={styles.categoryRow}>
            <MaterialIcons name="category" size={14} color={iconColor} />
            <ThemedText style={[styles.metaText, { color: subtleText }]}>
              {business.category}
            </ThemedText>
          </View>
          <View style={styles.addressRow}>
            <MaterialIcons name="location-on" size={14} color={iconColor} />
            <ThemedText style={[styles.metaText, { color: subtleText }]}>
              {business.address}
            </ThemedText>
          </View>

          {/* Description */}
          <ThemedText style={styles.description}>{business.description}</ThemedText>

          {/* Map section */}
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Location
          </ThemedText>
          <View style={[styles.mapWrapper, { width: width - 40 }]}>
            <Map
              initialCenter={coordinates}
              initialZoom={15}
              showUserLocation={false}
              markerCoordinate={coordinates}
              width={width - 40}
              height={MAP_HEIGHT}
            />
          </View>
        </ScrollView>
      </ThemedSafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  hero: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  name: {
    marginBottom: 8,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  metaText: {
    fontSize: 14,
    lineHeight: 20,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.8,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  mapWrapper: {
    height: MAP_HEIGHT,
    borderRadius: 12,
    overflow: "hidden",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LocalBusinessDetailScreen;
