import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

export interface TextFieldProps extends Omit<TextInputProps, "style"> {
  label: string;
  error?: string;
  inputStyle?: TextInputProps["style"];
  style?: StyleProp<ViewStyle>;
}

export function TextField({
  label,
  error,
  inputStyle,
  style,
  ...textInputProps
}: TextFieldProps) {
  const errorColor = useThemeColor({}, "error");

  return (
    <View style={style}>
      <ThemedText type="default" style={styles.label}>
        {label}
      </ThemedText>
      <TextInput
        style={[styles.input, inputStyle]}
        {...textInputProps}
      />
      {error ? (
        <ThemedText type="default" style={[styles.error, { color: errorColor }]}>
          {error}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginTop: 4,
  },
  error: {
    marginTop: 2,
  },
});
