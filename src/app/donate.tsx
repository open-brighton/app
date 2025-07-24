import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { VStack } from "@/components/VStack";
import React from "react";

export const DonateScreen = () => {
  return (
    <ThemedSafeAreaView>
      <VStack container>
        <ThemedText type="title">Donate</ThemedText>
      </VStack>
    </ThemedSafeAreaView>
  );
};

export default DonateScreen;
