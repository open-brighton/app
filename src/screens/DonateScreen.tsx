import { DonateForm } from "@/forms/DonateForm";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { VStack } from "@/components/VStack";
import React from "react";

export const DonateScreen = () => {
  return (
    <ThemedSafeAreaView>
      <VStack container gap={20}>
        <ThemedText type="title">Donate</ThemedText>
        <ThemedText type="default">
          Support us with a one-time or recurring donation.
        </ThemedText>
        <DonateForm />
      </VStack>
    </ThemedSafeAreaView>
  );
};

export default DonateScreen;
