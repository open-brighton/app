import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { StyleSheet, View } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

interface CardImagePlaceholderProps {
  icon: MaterialIconName;
  size?: number;
}

/**
 * Standardised placeholder image area for cards. Applies theme-aware icon
 * and background colours so each screen doesn't need to repeat the logic.
 */
export function CardImagePlaceholder({ icon, size = 40 }: CardImagePlaceholderProps) {
  const iconColor = useThemeColor({}, "icon");

  return (
    <View style={styles.container}>
      <MaterialIcons name={icon} size={size} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(104, 112, 118, 0.15)",
  },
});
