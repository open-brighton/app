import { ApolloError } from "@apollo/client";

/**
 * Returns a user-facing error message from a mutation/query error.
 * Prefers GraphQL error messages, then network error, then a generic fallback.
 */
export function getMutationErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string {
  if (error instanceof ApolloError) {
    const gqlMessages = error.graphQLErrors
      ?.map((e) => e.message)
      .filter(Boolean);
    if (gqlMessages && gqlMessages.length > 0) {
      return gqlMessages[0];
    }
    if (error.networkError?.message) {
      return error.networkError.message;
    }
    if (error.message) {
      return error.message;
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}
