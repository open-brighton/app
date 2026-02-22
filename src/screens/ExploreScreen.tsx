import { Map } from "@/components/Map";
import React from "react";
import { StyleSheet, View } from "react-native";

export const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <Map showUserLocation={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ExploreScreen;
