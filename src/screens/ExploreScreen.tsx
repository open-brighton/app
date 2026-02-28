import { Map } from "@/components/Map";
import { MapLayer, MapLayerTray } from "@/components/MapLayerTray";
import React, { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

const HEADER_OFFSET = 56;

const DEFAULT_LAYERS: MapLayer[] = [
  {
    id: "boundary",
    label: "Town Boundary",
    description: "Brighton town limits",
    icon: "map-outline",
    enabled: true,
  },
  {
    id: "userLocation",
    label: "My Location",
    description: "Show where you are",
    icon: "navigate-outline",
    enabled: true,
  },
];

export const ExploreScreen = () => {
  const { width, height } = useWindowDimensions();
  const mapHeight = height - HEADER_OFFSET;
  const [layers, setLayers] = useState<MapLayer[]>(DEFAULT_LAYERS);

  const handleLayerToggle = (id: string, enabled: boolean) => {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, enabled } : l)));
  };

  const getLayer = (id: string) =>
    layers.find((l) => l.id === id)?.enabled ?? false;

  return (
    <View
      style={[styles.container, { width, height: mapHeight }]}
      collapsable={false}
    >
      <Map
        showUserLocation={getLayer("userLocation")}
        showBoundary={getLayer("boundary")}
        width={width}
        height={mapHeight}
      />
      <MapLayerTray layers={layers} onLayerToggle={handleLayerToggle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ExploreScreen;
