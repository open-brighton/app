import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { VStack } from "@/components/VStack";
import React from "react";

export const FeedbackScreen = () => {
  return (
    <ThemedSafeAreaView>
      <VStack container>
        <ThemedText type="title">Feedback</ThemedText>
      </VStack>
    </ThemedSafeAreaView>
  );
};

export default FeedbackScreen;
