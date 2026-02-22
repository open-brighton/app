import { Tabs, useSegments } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export const TabLayout = () => {
  const { colorScheme } = useColorScheme();
  const segments = useSegments() as string[];
  const isNestedInProfile =
    segments.includes("profile") &&
    (segments.includes("settings") || segments.includes("debug"));

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: isNestedInProfile
          ? { display: "none" }
          : {
              backgroundColor:
                colorScheme === "dark"
                  ? Colors.dark.background
                  : Colors.light.background,
            },
        tabBarActiveTintColor:
          colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="message.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
