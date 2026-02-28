import { config } from "@/constants/config";
import { MapFeature } from "@/contexts/ExploreContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import Mapbox from "@rnmapbox/maps";
import React, { useEffect, useState } from "react";
import type { Feature } from "geojson";
import brightonBoundary from "@/data/brighton-boundary.json";
import brightonDebrisZones from "@/data/brighton-debris-zones.json";
import brightonParks from "@/data/brighton-parks.json";
import brightonRestaurants from "@/data/brighton-restaurants.json";
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
  showDebrisZones?: boolean;
  showParks?: boolean;
  showRestaurants?: boolean;
  /** When provided, renders a pin marker at the given [longitude, latitude]. */
  markerCoordinate?: [number, number];
  onMapPress?: (event: any) => void;
  onMapLoad?: () => void;
  onFeaturePress?: (feature: MapFeature) => void;
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
  showDebrisZones = false,
  showParks = false,
  showRestaurants = false,
  markerCoordinate,
  onMapPress,
  onMapLoad,
  onFeaturePress,
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
  const { colorScheme } = useColorScheme();
  const mapStyleURL =
    colorScheme === "dark" ? Mapbox.StyleURL.Dark : Mapbox.StyleURL.Light;

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
        styleURL={mapStyleURL}
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

        {markerCoordinate && (
          <Mapbox.PointAnnotation
            id="map-marker"
            coordinate={markerCoordinate}
          >
            <View style={styles.markerDot} />
          </Mapbox.PointAnnotation>
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

        {showDebrisZones && (
          <Mapbox.ShapeSource
            id="brighton-debris-zones-source"
            shape={brightonDebrisZones as unknown as Feature}
            onPress={(e) => {
              const f = e.features[0];
              if (f?.properties?.Area != null) {
                onFeaturePress?.({
                  type: "debris-zone",
                  name: `Area ${f.properties.Area}`,
                  area: f.properties.Area,
                  subarea: f.properties.SUBAREA,
                });
              }
            }}
          >
            <Mapbox.FillLayer
              id="brighton-debris-zones-fill"
              style={{ fillColor: "#F57C00", fillOpacity: 0.2 }}
            />
            <Mapbox.LineLayer
              id="brighton-debris-zones-outline"
              style={{ lineColor: "#E65100", lineWidth: 1.5 }}
            />
            <Mapbox.SymbolLayer
              id="brighton-debris-zones-labels"
              style={{
                textField: ["to-string", ["get", "Area"]],
                textSize: 13,
                textColor: "#fff",
                textHaloColor: "#E65100",
                textHaloWidth: 1.5,
                textFont: ["DIN Pro Bold", "Arial Unicode MS Bold"],
                symbolPlacement: "point",
              }}
            />
          </Mapbox.ShapeSource>
        )}

        {showParks && (
          <Mapbox.ShapeSource
            id="brighton-parks-source"
            shape={brightonParks as unknown as Feature}
            onPress={(e) => {
              const f = e.features[0];
              if (f?.properties?.name) {
                onFeaturePress?.({
                  type: "park",
                  name: f.properties.name,
                  address: f.properties.address,
                });
              }
            }}
          >
            <Mapbox.FillLayer
              id="brighton-parks-fill"
              style={{ fillColor: "#4CAF50", fillOpacity: 0.25 }}
            />
            <Mapbox.LineLayer
              id="brighton-parks-outline"
              style={{ lineColor: "#2E7D32", lineWidth: 1.5 }}
            />
          </Mapbox.ShapeSource>
        )}

        {showRestaurants && (
          <Mapbox.ShapeSource
            id="brighton-restaurants-source"
            shape={brightonRestaurants as unknown as Feature}
            onPress={(e) => {
              const f = e.features[0];
              if (f?.properties?.name) {
                onFeaturePress?.({
                  type: "restaurant",
                  name: f.properties.name,
                  address: f.properties.address,
                  phone: f.properties.phone,
                });
              }
            }}
          >
            <Mapbox.CircleLayer
              id="brighton-restaurants-points"
              style={{
                circleColor: "#E53935",
                circleRadius: 6,
                circleStrokeColor: "#fff",
                circleStrokeWidth: 1.5,
              }}
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
  markerDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#0a7ea4",
    borderWidth: 3,
    borderColor: "#fff",
  },
});
