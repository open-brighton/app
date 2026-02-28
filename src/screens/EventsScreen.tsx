import { gql, useQuery } from "@apollo/client";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import { ErrorState } from "@/components/ErrorState";
import { EVENT_CARD_FRAGMENT, EventCard, EventCard_event } from "@/components/EventCard";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { EventCategory } from "@/lib/graphql/types";

const GET_EVENTS = gql`
  ${EVENT_CARD_FRAGMENT}
  query GetEvents($first: Int, $after: String, $category: [EventCategory!]) {
    events(first: $first, after: $after, category: $category) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...EventCard_event
        }
      }
    }
  }
`;

type GetEventsData = {
  events: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    edges: Array<{ node: EventCard_event }>;
  };
};

type GetEventsVars = {
  first?: number;
  after?: string;
  category?: EventCategory[];
};

const PAGE_SIZE = 20;

export const EventsScreen = () => {
  const tint = useThemeColor({}, "tint");

  const { data, loading, error, refetch, fetchMore } = useQuery<GetEventsData, GetEventsVars>(
    GET_EVENTS,
    { variables: { first: PAGE_SIZE } }
  );

  const items = data?.events.edges.map((e) => e.node) ?? [];
  const pageInfo = data?.events.pageInfo;

  const handleLoadMore = () => {
    if (!pageInfo?.hasNextPage || !pageInfo.endCursor) return;
    fetchMore({ variables: { after: pageInfo.endCursor } });
  };

  if (error) {
    return (
      <ErrorState
        message="Failed to load events."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <ThemedSafeAreaView>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
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

export default EventsScreen;
