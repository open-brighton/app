import { FLOATING_FOOTER_HEIGHT } from "@/components/FloatingFooter";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { VStack } from "@/components/VStack";
import { DonateForm } from "@/forms/DonateForm";
import React from "react";
import { ScrollView } from "react-native";

export const DonateScreen = () => {
  return (
    <ThemedSafeAreaView>
      <ScrollView
        contentContainerStyle={{ paddingBottom: FLOATING_FOOTER_HEIGHT }}
        keyboardShouldPersistTaps="handled"
      >
        <VStack container gap={20}>
          <ThemedText type="default">
            This is a project built by and for the community — and it has real costs. If you&apos;re getting value out of it and you&apos;d like to see it keep going, please help keep the lights on.
          </ThemedText>
          <DonateForm />
        </VStack>
      </ScrollView>
    </ThemedSafeAreaView>
  );
};

export default DonateScreen;
