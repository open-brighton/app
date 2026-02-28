import { gql, useQuery } from "@apollo/client";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

import { FEED_CARD_FRAGMENT, FeedCard, FeedCard_feedItem } from "@/components/FeedCard";
import { HelloWave } from "@/components/HelloWave";
import { LottieAnimation } from "@/components/LottieAnimation";
import { ParallaxScrollView } from "@/components/ParallaxScrollView";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FeedItemCategory } from "@/lib/graphql/types";

const GET_FEED = gql`
  ${FEED_CARD_FRAGMENT}
  query GetFeed($first: Int, $after: String, $category: [FeedItemCategory!]) {
    feed(first: $first, after: $after, category: $category) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...FeedCard_feedItem
        }
      }
    }
  }
`;

type GetFeedData = {
  feed: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    edges: Array<{ node: FeedCard_feedItem }>;
  };
};

type GetFeedVars = {
  first?: number;
  after?: string;
  category?: FeedItemCategory[];
};

const PAGE_SIZE = 20;
const POLL_INTERVAL_MS = 60_000;

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
        <ThemedText type="title">Welcome to Open Brighton!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={nuxStyles.stepContainer}>
        <ThemedText type="subtitle">Discover your town</ThemedText>
        <ThemedText>
          Browse local events, businesses, and community resources — all in one place.
        </ThemedText>
      </ThemedView>
      <ThemedView style={nuxStyles.stepContainer}>
        <ThemedText type="subtitle">Explore the map</ThemedText>
        <ThemedText>
          Tap the Explore tab to see what's happening around Brighton.
        </ThemedText>
      </ThemedView>
      <ThemedView style={nuxStyles.stepContainer}>
        <ThemedText type="subtitle">Ask the assistant</ThemedText>
        <ThemedText>
          Use the Chat tab to ask questions about Brighton — events, parking, services, and more.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

export const HomeScreen = () => {
  const tint = useThemeColor({}, "tint");

  const { data, loading, error, refetch, fetchMore } = useQuery<GetFeedData, GetFeedVars>(
    GET_FEED,
    {
      variables: { first: PAGE_SIZE },
      pollInterval: POLL_INTERVAL_MS,
    }
  );

  const items = data?.feed.edges.map((e) => e.node) ?? [];
  const pageInfo = data?.feed.pageInfo;

  const handleLoadMore = () => {
    if (!pageInfo?.hasNextPage || !pageInfo.endCursor) return;
    fetchMore({ variables: { after: pageInfo.endCursor } });
  };

  if (error) {
    return (
      <ThemedSafeAreaView style={styles.centered}>
        <ThemedText>Failed to load feed.</ThemedText>
      </ThemedSafeAreaView>
    );
  }

  return (
    <ThemedSafeAreaView>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FeedCard feedItem={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={loading && items.length === 0}
        onRefresh={() => refetch({ first: PAGE_SIZE })}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loading && items.length > 0 ? (
            <ActivityIndicator color={tint} style={styles.footer} />
          ) : null
        }
      />
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    paddingVertical: 16,
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
