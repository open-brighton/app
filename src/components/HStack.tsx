import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface HStackProps {
  children: React.ReactNode;
  gap?: number;
  container?: boolean;
  style?: ViewStyle;
}

export function HStack({
  children,
  gap = 0,
  container = false,
  style,
}: HStackProps) {
  const containerStyle = container ? { paddingHorizontal: 20 } : {};

  return (
    <View style={[styles.hstack, { gap }, containerStyle, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  hstack: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
