import { config } from "@/constants/config";
import { useThemeColor } from "@/hooks/useThemeColor";
import Mapbox from "@rnmapbox/maps";
import React, { useEffect, useState } from "react";
import type { Feature } from "geojson";
import brightonBoundary from "@/data/brighton-boundary.json";
import {
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const MAPBOX_ACCESS_TOKEN = config.MAPBOX_ACCESS_TOKEN || "";

export type MapProps = {
  style?: any;
  initialCenter?: [number, number]; // [longitude, latitude]
  initialZoom?: number;
  showUserLocation?: boolean;
  showBoundary?: boolean;
  onMapPress?: (event: any) => void;
  onMapLoad?: () => void;
  /** Explicit dimensions for the map (e.g. from parent). Helps MapView layout on Android. */
  width?: number;
  height?: number;
};

export function Map({
  style,
  initialCenter = [-77.5855, 43.1334], // Brighton, NY coordinates
  initialZoom = 12,
  showUserLocation = true,
  showBoundary = false,
  onMapPress,
  onMapLoad,
  width: widthProp,
  height: heightProp,
}: MapProps) {
  const [isMapReady, setIsMapReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const windowSize = useWindowDimensions();
  const width = widthProp ?? windowSize.width;
  const height = heightProp ?? windowSize.height;
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  const handleMapLoad = () => {
    setIsMapReady(true);
    setLoadError(null);
    onMapLoad?.();
  };

  // If onMapIdle/onDidFinishLoadingMap never fire (e.g. Android), stop showing loading after a timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMapReady((ready) => (ready ? ready : true));
    }, 12000);
    return () => clearTimeout(timeout);
  }, []);

  const handleLoadError = () => {
    if (__DEV__) {
      console.warn("Mapbox map loading error – check token and style URL");
    }
    setLoadError("Map failed to load");
    setIsMapReady(true); // hide loading overlay
  };

  if (!MAPBOX_ACCESS_TOKEN?.trim()) {
    return (
      <View style={[styles.container, { backgroundColor }, style]}>
        <Text style={[styles.errorText, { color: textColor }]}>
          Please set up your Mapbox access token in the Map component
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { width, height },
        Platform.OS === "android" && styles.containerAndroid,
        style,
      ]}
      collapsable={false}
    >
      <Mapbox.MapView
        style={[styles.map, { width, height }]}
        collapsable={false}
        styleURL={Mapbox.StyleURL.Street}
        onMapIdle={handleMapLoad}
        onDidFinishLoadingMap={handleMapLoad}
        onMapLoadingError={handleLoadError}
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

        {showBoundary && (
          <Mapbox.ShapeSource
            id="brighton-boundary-source"
            shape={brightonBoundary as unknown as Feature}
          >
            <Mapbox.FillLayer
              id="brighton-boundary-fill"
              style={{ fillColor: "#4A90D9", fillOpacity: 0.15 }}
            />
            <Mapbox.LineLayer
              id="brighton-boundary-outline"
              style={{ lineColor: "#4A90D9", lineWidth: 2 }}
            />
          </Mapbox.ShapeSource>
        )}
      </Mapbox.MapView>

      {!isMapReady && (
        <View style={styles.loadingOverlay}>
          <Text style={[styles.loadingText, { color: textColor }]}>
            Loading map...
          </Text>
        </View>
      )}
      {isMapReady && loadError && (
        <View style={styles.errorBanner}>
          <Text style={[styles.errorBannerText, { color: textColor }]}>
            {loadError}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  containerAndroid: {
    elevation: 2,
    overflow: "visible",
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
  errorBanner: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    padding: 12,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 8,
  },
  errorBannerText: {
    fontSize: 14,
    textAlign: "center",
  },
});
