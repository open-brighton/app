import config from "@/constants/config";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  uri: `${config.API_HOST}/graphql`,
});

const errorLink = onError(({ graphQLErrors, networkError, forward, operation }) => {
  if (__DEV__) {
    if (graphQLErrors?.length) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          "[GraphQL error]",
          message,
          locations != null ? { locations, path } : ""
        );
      });
    }
    if (networkError) {
      console.error("[Network error]", networkError);
    }
  }
  return forward(operation);
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feed: relayStylePagination(["category"]),
          events: relayStylePagination(["category"]),
          businesses: relayStylePagination(["category"]),
        },
      },
    },
  }),
});