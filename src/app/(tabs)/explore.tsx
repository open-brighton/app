import { Map } from "@/components/Map";
import React from "react";
import { StyleSheet } from "react-native";

export const ExploreScreen = () => {
  return (
    <Map
      style={styles.map}
      initialCenter={[-77.5855, 43.1334]} // Brighton, NY
      initialZoom={12}
      showUserLocation={true}
      onMapLoad={() => console.log("Map loaded")}
    />
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
  },
  componentContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  component: {
    marginVertical: 10,
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  mapContainer: {
    height: 300,
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
});

export default ExploreScreen;
