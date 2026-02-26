import { ThemedButton } from "@/components/ThemedButton";
import { VStack } from "@/components/VStack";
import { TextField } from "@/fields/TextField";
import { getMutationErrorMessage } from "@/lib/errors";
import { SUBMIT_FEEDBACK } from "@/lib/graphql/mutations";
import { SubmitFeedbackInput, SubmitFeedbackResponse } from "@/lib/graphql/types";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  category: z.string().min(1, "Category is required"),
  message: z.string().min(1, "Message is required"),
});

type FeedbackFormData = z.infer<typeof schema>;

export function FeedbackForm() {
  const [submitFeedback, { loading }] = useMutation<
    SubmitFeedbackResponse,
    { input: SubmitFeedbackInput }
  >(SUBMIT_FEEDBACK);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(schema),
  });

  React.useEffect(() => {
    register("email");
    register("category");
    register("message");
  }, [register]);

  const onSubmit = async (data: FeedbackFormData) => {
    try {
      await submitFeedback({
        variables: {
          input: {
            email: data.email,
            category: data.category,
            message: data.message,
          },
        },
      });

      Alert.alert("Success", "Thank you for your feedback!", [
        {
          text: "OK",
          onPress: () => reset(),
        },
      ]);
    } catch (error) {
      console.error("Error submitting feedback form:", error);
      const message = getMutationErrorMessage(
        error,
        "Failed to send feedback. Please try again."
      );
      Alert.alert("Error", message, [{ text: "OK" }]);
    }
  };

  return (
    <VStack gap={20}>
      <TextField
        label="Email"
        placeholder="Your email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setValue("email", text)}
        error={errors.email?.message}
      />
      <TextField
        label="Category"
        placeholder="e.g. Bug report, Suggestion, General"
        onChangeText={(text) => setValue("category", text)}
        error={errors.category?.message}
      />
      <TextField
        label="Message"
        placeholder="Your feedback"
        multiline
        inputStyle={{ height: 100 }}
        onChangeText={(text) => setValue("message", text)}
        error={errors.message?.message}
      />
      <ThemedButton
        title={loading ? "Sending..." : "Send feedback"}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />
    </VStack>
  );
}
