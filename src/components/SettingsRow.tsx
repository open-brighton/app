import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface SettingsRowProps {
  /** Row label. */
  label: string;
  /** Optional right-hand value (e.g. version string). */
  value?: string;
  /** When provided, renders a chevron and makes the row pressable. */
  onPress?: () => void;
}

/**
 * Standardised settings/info row used in SettingsScreen and ProfileScreen.
 * Shows a label on the left and either a value or a chevron on the right.
 */
export function SettingsRow({ label, value, onPress }: SettingsRowProps) {
  const itemBg = useThemeColor({}, "itemBackground");
  const primary = useThemeColor({ light: Colors.light.primary, dark: Colors.dark.primary }, "primary");

  const inner = (
    <ThemedView style={[styles.row, { backgroundColor: itemBg }]}>
      <ThemedText type="defaultSemiBold">{label}</ThemedText>
      {value != null && <ThemedText>{value}</ThemedText>}
      {onPress != null && value == null && (
        <IconSymbol size={16} name="chevron.right" color={primary} />
      )}
    </ThemedView>
  );

  if (onPress != null) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {inner}
      </TouchableOpacity>
    );
  }

  return inner;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
});
