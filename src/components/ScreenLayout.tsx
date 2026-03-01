import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

interface ScreenLayoutProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function ScreenLayout({ children, footer }: ScreenLayoutProps) {
  const { colorScheme } = useColorScheme();

  return (
    <ThemedSafeAreaView>
      <ScrollView
        style={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
      {footer && (
        <View
          style={[
            styles.footer,
            {
              backgroundColor:
                colorScheme === "dark"
                  ? Colors.dark.background
                  : Colors.light.background,
            },
          ]}
        >
          {footer}
        </View>
      )}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc",
  },
});
