import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";

export const ProfileLayout = () => {
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
      <Stack.Screen name="index" options={{ title: "Profile" }} />
    </Stack>
  );
};

export default ProfileLayout;
