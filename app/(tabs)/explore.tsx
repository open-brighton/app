import Map from "@/components/Map";
import Progress from "@/components/Progress";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import VStack from "@/components/VStack";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function ExploreScreen() {
  return (
    <ThemedSafeAreaView>
      <VStack container>
        <View style={styles.mapContainer}>
          <Map
            style={styles.map}
            initialCenter={[-0.1396, 50.8225]} // Brighton, UK
            initialZoom={12}
            showUserLocation={true}
            onMapLoad={() => console.log("Map loaded")}
          />
        </View>
        <Progress loop={true} size={150} style={styles.component} />
      </VStack>
    </ThemedSafeAreaView>
  );
}

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
