import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { VStack } from "@/components/VStack";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

// Placeholder data for profile UI (replace with real user data when auth is implemented)
const profileData = {
  firstName: "John",
  lastName: "Doe",
  email: "user@example.com",
  phone: "(555) 000-0000",
  addressStreet: "123 Example St",
  addressCityStateZip: "City, ST 00000",
};

export function ProfileScreen() {
  const { colorScheme } = useColorScheme();

  return (
    <ThemedSafeAreaView>
      <ScrollView style={styles.container}>
        <ThemedView>
          <ThemedText type="title" style={styles.title}>
            {profileData.firstName} {profileData.lastName}
          </ThemedText>

          {/* Avatar Section */}
          <View style={styles.avatarContainer}>
            <View style={[
              styles.avatar, 
              { backgroundColor: colorScheme === "dark" ? Colors.dark.primary : Colors.light.primary }
            ]}>
              <IconSymbol
                name="person.fill"
                size={60}
                color={colorScheme === "dark" ? Colors.dark.background : Colors.light.background}
              />
            </View>
          </View>

          {/* Profile Information */}
          <VStack gap={20} style={styles.profileInfo}>
            {/* Contact Information */}
            <ThemedView style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Contact Information
              </ThemedText>
              <ThemedView style={styles.infoItem}>
                <ThemedText type="defaultSemiBold">Email</ThemedText>
                <ThemedText>{profileData.email}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.infoItem}>
                <ThemedText type="defaultSemiBold">Phone</ThemedText>
                <ThemedText>{profileData.phone}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.addressItem}>
                <ThemedText type="defaultSemiBold">Address</ThemedText>
                <View style={styles.addressLines}>
                  <ThemedText style={styles.addressText}>
                    {profileData.addressStreet}
                  </ThemedText>
                  <ThemedText style={styles.addressText}>
                    {profileData.addressCityStateZip}
                  </ThemedText>
                </View>
              </ThemedView>
            </ThemedView>
          </VStack>
        </ThemedView>
      </ScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 30,
    textAlign: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    marginBottom: 10,
  },
  addressItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    marginBottom: 10,
  },
  addressLines: {
    flex: 1,
    alignItems: "flex-end",
    marginLeft: 10,
    gap: 2,
  },
  addressText: {
    textAlign: "right",
  },
});

export default ProfileScreen;
