import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { VStack } from "@/components/VStack";
import { DonateForm } from "@/forms/DonateForm";
import React from "react";

export const DonateScreen = () => {
  return (
    <ThemedSafeAreaView>
      <VStack container gap={20}>
        <ThemedText type="default">
          This is a project built by and for the community — and it has real costs. If you're getting value out of it and you'd like to see it keep going, please help keep the lights on.
        </ThemedText>
        <DonateForm />
      </VStack>
    </ThemedSafeAreaView>
  );
};

export default DonateScreen;
