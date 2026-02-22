import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

const DEFAULT_EDGES: Edge[] = ["left", "right", "bottom"];

interface ThemedSafeAreaViewProps {
  children: React.ReactNode;
  style?: any;
  /** Safe area edges to apply. Defaults to left, right, bottom (no top, for screens with a header). Use ["top", "left", "right", "bottom"] for full-screen screens without a header. */
  edges?: Edge[];
}

export function ThemedSafeAreaView({
  children,
  style,
  edges = DEFAULT_EDGES,
}: ThemedSafeAreaViewProps) {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView
      edges={edges}
      style={[
        {
          flex: 1,
          backgroundColor:
            colorScheme === "dark"
              ? Colors.dark.background
              : Colors.light.background,
        },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}
