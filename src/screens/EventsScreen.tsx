import React from "react";
import { StyleSheet, View } from "react-native";

import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";

export const EventsScreen = () => {
  return (
    <ThemedSafeAreaView>
      <View style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Events
        </ThemedText>
        <ThemedText style={styles.body}>
          Browse upcoming events in Brighton. Coming soon.
        </ThemedText>
      </View>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    marginBottom: 12,
    textAlign: "center",
  },
  body: {
    textAlign: "center",
    opacity: 0.7,
  },
});

export default EventsScreen;
