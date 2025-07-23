import { ThemedText } from "@/components/ThemedText";
import VStack from "@/components/VStack";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutScreen() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === "dark"
            ? Colors.dark.background
            : Colors.light.background,
      }}
    >
      <VStack container>
        <ThemedText type="title">Support</ThemedText>
      </VStack>
    </SafeAreaView>
  );
}
