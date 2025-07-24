import { ContactForm } from "@/components/ContactForm";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { VStack } from "@/components/VStack";
import React from "react";

export const ContactScreen = () => {
  return (
    <ThemedSafeAreaView>
      <VStack container>
        <ThemedText type="title">Contact</ThemedText>
        <ContactForm />
      </VStack>
    </ThemedSafeAreaView>
  );
};

export default ContactScreen;
