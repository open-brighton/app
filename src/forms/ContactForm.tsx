import { ThemedButton } from "@/components/ThemedButton";
import { VStack } from "@/components/VStack";
import { TextField } from "@/fields/TextField";
import { SUBMIT_CONTACT } from "@/lib/graphql/mutations";
import { SubmitContactInput, SubmitContactResponse } from "@/lib/graphql/types";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { z } from "zod";

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
      <TextField
        label="Name"
        placeholder="Your name"
        onChangeText={(text) => setValue("name", text)}
        error={errors.name?.message}
      />
      <TextField
        label="Email"
        placeholder="Your email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setValue("email", text)}
        error={errors.email?.message}
      />
      <TextField
        label="Message"
        placeholder="Your message"
        multiline
        inputStyle={{ height: 100 }}
        onChangeText={(text) => setValue("message", text)}
        error={errors.message?.message}
      />
      <ThemedButton
        title={loading ? "Sending..." : "Send"}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />
    </VStack>
  );
}
