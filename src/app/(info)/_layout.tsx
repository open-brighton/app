import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";

export default function InfoLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor:
            colorScheme === "dark"
              ? Colors.dark.background
              : Colors.light.background,
        },
        headerTintColor:
          colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
      }}
    >
      <Stack.Screen name="feedback" />
      <Stack.Screen name="contact" />
      <Stack.Screen name="about" />
      <Stack.Screen name="donate" />
      <Stack.Screen name="privacy" />
      <Stack.Screen name="terms" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="local-business" />
      <Stack.Screen name="events" />
      <Stack.Screen name="resources" />
    </Stack>
  );
}
