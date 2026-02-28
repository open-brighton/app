import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { SettingsRow } from "@/components/SettingsRow";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { VStack } from "@/components/VStack";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

// Placeholder data (replace with real user data when auth is implemented)
const profileData = {
  firstName: "John",
  lastName: "Doe",
  email: "user@example.com",
  phone: "(555) 000-0000",
  address: "123 Example St, City, ST 00000",
};

export function ProfileScreen() {
  const primary = useThemeColor({ light: Colors.light.primary, dark: Colors.dark.primary }, "primary");
  const background = useThemeColor({}, "background");
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const handleAvatarPress = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  return (
    <ThemedSafeAreaView>
      <ScrollView style={styles.container}>
        <ThemedView>
          <ThemedText type="title" style={styles.title}>
            {profileData.firstName} {profileData.lastName}
          </ThemedText>

          <View style={styles.avatarContainer}>
            <Pressable onPress={handleAvatarPress} style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1 }]}>
              <View style={[styles.avatar, { backgroundColor: primary }]}>
                {avatarUri ? (
                  <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
                ) : (
                  <IconSymbol name="person.fill" size={60} color={background} />
                )}
              </View>
              <View style={[styles.editBadge, { backgroundColor: primary }]}>
                <IconSymbol name="camera.fill" size={14} color={background} />
              </View>
            </Pressable>
          </View>

          <VStack gap={20} style={styles.profileInfo}>
            <ThemedView style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Contact Information
              </ThemedText>
              <SettingsRow label="Email" value={profileData.email} />
              <SettingsRow label="Phone" value={profileData.phone} />
              <SettingsRow label="Address" value={profileData.address} />
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
    overflow: "hidden",
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
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
});

export default ProfileScreen;
