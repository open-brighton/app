import { gql, useQuery } from "@apollo/client";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import {
  BUSINESS_CARD_FRAGMENT,
  BusinessCard,
  BusinessCard_business,
} from "@/components/BusinessCard";
import { ErrorState } from "@/components/ErrorState";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { BusinessCategory } from "@/lib/graphql/types";

const GET_BUSINESSES = gql`
  ${BUSINESS_CARD_FRAGMENT}
  query GetBusinesses($first: Int, $after: String, $category: [BusinessCategory!]) {
    businesses(first: $first, after: $after, category: $category) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...BusinessCard_business
        }
      }
    }
  }
`;

type GetBusinessesData = {
  businesses: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    edges: { node: BusinessCard_business }[];
  };
};

type GetBusinessesVars = {
  first?: number;
  after?: string;
  category?: BusinessCategory[];
};

const PAGE_SIZE = 20;

export const LocalBusinessScreen = () => {
  const tint = useThemeColor({}, "tint");

  const { data, loading, error, refetch, fetchMore } = useQuery<
    GetBusinessesData,
    GetBusinessesVars
  >(GET_BUSINESSES, { variables: { first: PAGE_SIZE } });

  const items = data?.businesses.edges.map((e) => e.node) ?? [];
  const pageInfo = data?.businesses.pageInfo;

  const handleLoadMore = () => {
    if (!pageInfo?.hasNextPage || !pageInfo.endCursor) return;
    fetchMore({ variables: { after: pageInfo.endCursor } });
  };

  if (error) {
    return (
      <ErrorState
        message="Failed to load businesses."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <ThemedSafeAreaView>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BusinessCard business={item} />}
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

export default LocalBusinessScreen;
