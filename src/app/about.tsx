import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import VStack from "@/components/VStack";
import React from "react";

export default function AboutScreen() {
  return (
    <ThemedSafeAreaView>
      <VStack container>
        <ThemedText type="title">About</ThemedText>
      </VStack>
    </ThemedSafeAreaView>
  );
}
