import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface ThemedButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
}

export function ThemedButton({
  title,
  variant = "primary",
  size = "medium",
  style,
  ...props
}: ThemedButtonProps) {
  const { colorScheme } = useColorScheme();

  const buttonStyle = [styles.base, styles[size], styles[variant], style];

  const textStyle = [
    styles.text,
    styles[`${size}Text`],
    styles[`${variant}Text`],
  ];

  return (
    <TouchableOpacity style={buttonStyle} activeOpacity={0.7} {...props}>
      <ThemedText type="defaultSemiBold" style={textStyle}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  // Size variants
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  // Variant styles
  primary: {
    backgroundColor: "#c7aa3c",
  },
  secondary: {
    backgroundColor: "#e6e6e6",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
  // Text styles
  text: {
    textAlign: "center",
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  primaryText: {
    color: "#fff",
  },
  secondaryText: {
    color: Colors.light.text,
  },
  outlineText: {
    color: Colors.light.tint,
  },
});
