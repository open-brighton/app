import React from "react";
import { render, screen } from "@testing-library/react-native";
import { ColorSchemeProvider } from "@/contexts/ColorSchemeContext";
import { ErrorBoundary } from "../ErrorBoundary";

const Throw = () => {
  throw new Error("Test error");
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ColorSchemeProvider>{children}</ColorSchemeProvider>
);

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <>{null}</>
      </ErrorBoundary>,
      { wrapper }
    );
    expect(screen.queryByText("Something went wrong")).toBeNull();
  });

  it("renders fallback UI when child throws", () => {
    render(
      <ErrorBoundary>
        <Throw />
      </ErrorBoundary>,
      { wrapper }
    );
    expect(screen.getByText("Something went wrong")).toBeTruthy();
    expect(screen.getByText("Try again")).toBeTruthy();
  });

  it("renders custom fallback when provided", () => {
    render(
      <ErrorBoundary fallback={<>{null}</>}>
        <Throw />
      </ErrorBoundary>,
      { wrapper }
    );
    expect(screen.queryByText("Something went wrong")).toBeNull();
  });
});
