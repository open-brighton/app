import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
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
  const tint = useThemeColor({}, "tint");
  const secondaryBg = useThemeColor({}, "secondaryButton");
  const defaultTextColor = useThemeColor({}, "text");

  let variantStyle: ViewStyle;
  let textColor: string;

  switch (variant) {
    case "secondary":
      variantStyle = { backgroundColor: secondaryBg };
      textColor = defaultTextColor;
      break;
    case "outline":
      variantStyle = { backgroundColor: "transparent", borderWidth: 1, borderColor: tint };
      textColor = tint;
      break;
    default:
      variantStyle = { backgroundColor: Colors.light.primary };
      textColor = "#fff";
  }

  return (
    <TouchableOpacity
      style={[styles.base, styles[size], variantStyle, style]}
      activeOpacity={0.7}
      {...props}
    >
      <ThemedText
        type="defaultSemiBold"
        style={[styles.text, styles[`${size}Text`], { color: textColor }]}
      >
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
});
