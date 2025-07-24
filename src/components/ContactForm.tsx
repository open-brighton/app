import { ThemedText } from "@/components/ThemedText";
import VStack from "@/components/VStack";
import { SUBMIT_CONTACT } from "@/lib/graphql/mutations";
import { SubmitContactInput, SubmitContactResponse } from "@/lib/graphql/types";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import { z } from "zod";
import { ThemedButton } from "./ThemedButton";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof schema>;

export function ContactForm() {
  const [submitContact, { loading }] = useMutation<
    SubmitContactResponse,
    { input: SubmitContactInput }
  >(SUBMIT_CONTACT);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });

  React.useEffect(() => {
    register("name");
    register("email");
    register("message");
  }, [register]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContact({
        variables: {
          input: {
            email: data.email,
            name: data.name,
            message: data.message,
          },
        },
      });

      Alert.alert("Success", "Your message has been sent successfully!", [
        {
          text: "OK",
          onPress: () => reset(),
        },
      ]);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      Alert.alert("Error", "Failed to send message. Please try again.", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <VStack gap={20}>
      <View>
        <ThemedText type="default" style={styles.label}>
          Name
        </ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValue("name", text)}
          placeholder="Your name"
        />
        {errors.name && (
          <ThemedText type="default" style={styles.error}>
            {errors.name.message}
          </ThemedText>
        )}
      </View>

      <View>
        <ThemedText type="default" style={styles.label}>
          Email
        </ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValue("email", text)}
          placeholder="Your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && (
          <ThemedText type="default" style={styles.error}>
            {errors.email.message}
          </ThemedText>
        )}
      </View>

      <View>
        <ThemedText type="default" style={styles.label}>
          Message
        </ThemedText>
        <TextInput
          style={[styles.input, { height: 100 }]}
          onChangeText={(text) => setValue("message", text)}
          placeholder="Your message"
          multiline
        />
        {errors.message && (
          <ThemedText type="default" style={styles.error}>
            {errors.message.message}
          </ThemedText>
        )}
      </View>

      <ThemedButton
        title={loading ? "Sending..." : "Send"}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />
    </VStack>
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
    color: "red",
    marginTop: 2,
  },
});
