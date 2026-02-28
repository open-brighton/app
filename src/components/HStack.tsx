import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface HStackProps {
  children: React.ReactNode;
  gap?: number;
  container?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function HStack({ children, gap = 0, container = false, style }: HStackProps) {
  return (
    <View
      style={[
        styles.hstack,
        { gap },
        container && { paddingHorizontal: 20 },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  hstack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
