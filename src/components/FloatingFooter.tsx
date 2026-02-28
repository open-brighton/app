import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FloatingFooterProps {
  children: React.ReactNode;
}

export function FloatingFooter({ children }: FloatingFooterProps) {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 16),
          backgroundColor:
            colorScheme === "dark"
              ? Colors.dark.background
              : Colors.light.background,
        },
      ]}
    >
      {children}
    </View>
  );
}

/** The height to pad scrollable content so it clears the floating footer. */
export const FLOATING_FOOTER_HEIGHT = 80;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc",
  },
});
