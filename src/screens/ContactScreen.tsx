import { ContactForm } from "@/forms/ContactForm";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { VStack } from "@/components/VStack";
import React from "react";

export const ContactScreen = () => {
  return (
    <ThemedSafeAreaView>
      <VStack container>
        <ContactForm />
      </VStack>
    </ThemedSafeAreaView>
  );
};

export default ContactScreen;
