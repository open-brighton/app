import React from "react";
import { View, ViewStyle } from "react-native";

interface VStackProps {
  children: React.ReactNode[] | React.ReactNode;
  gap?: number;
  style?: ViewStyle;
  container?: boolean;
}

export function VStack({
  children,
  gap = 2,
  style,
  container = false,
}: VStackProps) {
  const childrenArray = React.Children.toArray(children);
  return (
    <View
      style={[
        style,
        { flexDirection: "column", gap },
        container && { paddingHorizontal: 16, paddingTop: 16 },
      ]}
    >
      {childrenArray.map((child, idx) => (
        <View key={idx}>
          {child}
        </View>
      ))}
    </View>
  );
}
