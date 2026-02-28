import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface VStackProps {
  children: React.ReactNode;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  container?: boolean;
}

export function VStack({ children, gap = 2, style, container = false }: VStackProps) {
  return (
    <View
      style={[
        { flexDirection: "column", gap },
        container && { paddingHorizontal: 16, paddingTop: 16 },
        style,
      ]}
    >
      {children}
    </View>
  );
}
