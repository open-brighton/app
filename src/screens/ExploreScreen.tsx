import { Map } from "@/components/Map";
import { MapDetailTray } from "@/components/MapDetailTray";
import { MapLayer, MapLayerTray } from "@/components/MapLayerTray";
import { useExploreContext } from "@/contexts/ExploreContext";
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
    id: "debris-zones",
    label: "Yard Debris Zones",
    description: "Leaf & yard debris collection areas",
    icon: "trash-outline",
    enabled: false,
  },
  {
    id: "parks",
    label: "Town Parks",
    description: "Public parks and green spaces",
    icon: "leaf-outline",
    enabled: true,
  },
  {
    id: "restaurants",
    label: "Restaurants",
    description: "Dining and eateries in Brighton",
    icon: "restaurant-outline",
    enabled: true,
  },
];

export const ExploreScreen = () => {
  const { width, height } = useWindowDimensions();
  const mapHeight = height - HEADER_OFFSET;
  const [layers, setLayers] = useState<MapLayer[]>(DEFAULT_LAYERS);
  const {
    isLayerTrayOpen,
    closeLayerTray,
    selectedFeature,
    openDetailTray,
    closeDetailTray,
  } = useExploreContext();

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
        showBoundary={getLayer("boundary")}
        showDebrisZones={getLayer("debris-zones")}
        showParks={getLayer("parks")}
        showRestaurants={getLayer("restaurants")}
        onFeaturePress={openDetailTray}
        width={width}
        height={mapHeight}
      />
      <MapLayerTray
        isOpen={isLayerTrayOpen}
        layers={layers}
        onLayerToggle={handleLayerToggle}
        onClose={closeLayerTray}
      />
      <MapDetailTray
        isOpen={selectedFeature !== null}
        feature={selectedFeature}
        onClose={closeDetailTray}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ExploreScreen;
