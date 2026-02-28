import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We encountered an unexpected error.",
  onRetry,
}: ErrorStateProps) {
  const errorColor = useThemeColor({}, "error");
  const subtleColor = useThemeColor({}, "icon");

  return (
    <ThemedSafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <MaterialIcons name="error-outline" size={52} color={errorColor} />
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {title}
        </ThemedText>
        <ThemedText style={[styles.message, { color: subtleColor }]}>
          {message}
        </ThemedText>
        {onRetry && (
          <ThemedButton
            title="Try again"
            variant="primary"
            size="medium"
            onPress={onRetry}
            style={styles.button}
          />
        )}
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    alignItems: "center",
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 4,
  },
  message: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  button: {
    marginTop: 8,
    minWidth: 120,
  },
});
