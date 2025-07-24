import React from "react";
import { StyleSheet, View } from "react-native";
import { Map } from "./Map";

export function MapExample() {
  return (
    <View style={styles.container}>
      {/* Basic Map */}
      <Map
        style={styles.map}
        initialCenter={[-77.5855, 43.1334]} // Brighton, NY
        initialZoom={12}
        showUserLocation={true}
        onMapLoad={() => console.log("Map loaded successfully")}
      />

      {/* Map with different center and zoom */}
      <Map
        style={styles.map}
        initialCenter={[-0.1276, 51.5074]} // London, UK
        initialZoom={10}
        showUserLocation={false}
        onMapPress={(event: unknown) => console.log("Map pressed:", event)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: 200,
    marginVertical: 10,
    borderRadius: 8,
  },
});
