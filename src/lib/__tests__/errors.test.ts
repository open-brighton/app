import { ApolloError } from "@apollo/client";
import { getMutationErrorMessage } from "../errors";

describe("getMutationErrorMessage", () => {
  it("returns first GraphQL error message when present", () => {
    const error = new ApolloError({
      graphQLErrors: [
        { message: "Validation failed", extensions: {} },
        { message: "Second error", extensions: {} },
      ],
    });
    expect(getMutationErrorMessage(error)).toBe("Validation failed");
  });

  it("returns network error message when no GraphQL errors", () => {
    const error = new ApolloError({
      networkError: new Error("Network request failed"),
    });
    expect(getMutationErrorMessage(error)).toBe("Network request failed");
  });

  it("returns fallback for generic Error", () => {
    expect(getMutationErrorMessage(new Error("Oops"), "Default")).toBe("Oops");
  });

  it("returns custom fallback when error has no message", () => {
    expect(getMutationErrorMessage({}, "Please try again.")).toBe(
      "Please try again."
    );
  });
});
