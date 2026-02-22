import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { VStack } from "@/components/VStack";
import { FeedbackForm } from "@/forms/FeedbackForm";
import React from "react";

export const FeedbackScreen = () => {
  return (
    <ThemedSafeAreaView>
      <VStack container>
        <FeedbackForm />
      </VStack>
    </ThemedSafeAreaView>
  );
};

export default FeedbackScreen;
