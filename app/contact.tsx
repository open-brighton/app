import ContactForm from "@/components/ContactForm";
import { ThemedText } from "@/components/ThemedText";
import VStack from "@/components/VStack";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ContactScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack gap={24}>
        <ThemedText type="title">Contact</ThemedText>
        <ContactForm />
      </VStack>
    </SafeAreaView>
  );
}
