import React from "react";
import { render, screen } from "@testing-library/react-native";
import { ErrorBoundary } from "../ErrorBoundary";

const Throw = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <>{null}</>
      </ErrorBoundary>
    );
    expect(screen.queryByText("Something went wrong")).toBeNull();
  });

  it("renders fallback UI when child throws", () => {
    render(
      <ErrorBoundary>
        <Throw />
      </ErrorBoundary>
    );
    expect(screen.getByText("Something went wrong")).toBeTruthy();
    expect(screen.getByText("Try again")).toBeTruthy();
  });

  it("renders custom fallback when provided", () => {
    render(
      <ErrorBoundary fallback={<>{null}</>}>
        <Throw />
      </ErrorBoundary>
    );
    expect(screen.queryByText("Something went wrong")).toBeNull();
  });
});
