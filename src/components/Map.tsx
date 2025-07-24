import { useThemeColor } from "@/hooks/useThemeColor";
import Mapbox from "@rnmapbox/maps";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// You'll need to set up your Mapbox access token
// For development, you can get a free token from https://account.mapbox.com/
// Set EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN in your environment variables
const MAPBOX_ACCESS_TOKEN =
  process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN || "YOUR_MAPBOX_ACCESS_TOKEN";

export type MapProps = {
  style?: any;
  initialCenter?: [number, number]; // [longitude, latitude]
  initialZoom?: number;
  showUserLocation?: boolean;
  onMapPress?: (event: any) => void;
  onMapLoad?: () => void;
};

export function Map({
  style,
  initialCenter = [-77.5855, 43.1334], // Brighton, NY coordinates
  initialZoom = 12,
  showUserLocation = true,
  onMapPress,
  onMapLoad,
}: MapProps) {
  const [isMapReady, setIsMapReady] = useState(false);
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  useEffect(() => {
    // Initialize Mapbox
    Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);
  }, []);

  const handleMapLoad = () => {
    setIsMapReady(true);
    onMapLoad?.();
  };

  if (
    !MAPBOX_ACCESS_TOKEN ||
    MAPBOX_ACCESS_TOKEN === "YOUR_MAPBOX_ACCESS_TOKEN"
  ) {
    return (
      <View style={[styles.container, { backgroundColor }, style]}>
        <Text style={[styles.errorText, { color: textColor }]}>
          Please set up your Mapbox access token in the Map component
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Mapbox.MapView
        style={styles.map}
        styleURL={Mapbox.StyleURL.Street}
        onMapIdle={handleMapLoad}
      >
        <Mapbox.Camera
          zoomLevel={initialZoom}
          centerCoordinate={initialCenter}
          animationMode="flyTo"
          animationDuration={2000}
        />

        {showUserLocation && (
          <Mapbox.UserLocation showsUserHeadingIndicator={true} />
        )}
      </Mapbox.MapView>

      {!isMapReady && (
        <View style={styles.loadingOverlay}>
          <Text style={[styles.loadingText, { color: textColor }]}>
            Loading map...
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
});
