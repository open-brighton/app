import { Map } from "@/components/Map";
import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

const HEADER_OFFSET = 56;

export const ExploreScreen = () => {
  const { width, height } = useWindowDimensions();
  const mapHeight = height - HEADER_OFFSET;
  return (
    <View style={[styles.container, { width, height: mapHeight }]} collapsable={false}>
      <Map showUserLocation={true} width={width} height={mapHeight} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ExploreScreen;
