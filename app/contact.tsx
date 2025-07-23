import ContactForm from "@/components/ContactForm";
import { ThemedText } from "@/components/ThemedText";
import VStack from "@/components/VStack";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ContactScreen() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === "dark"
            ? Colors.dark.background
            : Colors.light.background,
      }}
    >
      <VStack container>
        <ThemedText type="title">Contact</ThemedText>
        <ContactForm />
      </VStack>
    </SafeAreaView>
  );
}
