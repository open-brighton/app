import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface ThemedSafeAreaViewProps {
  children: React.ReactNode;
  style?: any;
}

export default function ThemedSafeAreaView({
  children,
  style,
}: ThemedSafeAreaViewProps) {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView
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
