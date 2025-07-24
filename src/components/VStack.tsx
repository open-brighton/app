import React from "react";
import { View, ViewStyle } from "react-native";

interface VStackProps {
  children: React.ReactNode[] | React.ReactNode;
  gap?: number;
  style?: ViewStyle;
  container?: boolean;
}

export default function VStack({
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
        container && { paddingHorizontal: 16 },
      ]}
    >
      {childrenArray.map((child, idx) => (
        <View
          key={idx}
          style={
            idx < childrenArray.length - 1 ? { marginBottom: gap } : undefined
          }
        >
          {child}
        </View>
      ))}
    </View>
  );
}
