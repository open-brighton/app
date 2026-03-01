import { ScreenLayout } from "@/components/ScreenLayout";
import { ThemedButton } from "@/components/ThemedButton";
import { VStack } from "@/components/VStack";
import { ContactForm } from "@/forms/ContactForm";
import { getMutationErrorMessage } from "@/lib/errors";
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

export const ContactScreen = () => {
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
        { text: "OK", onPress: () => reset() },
      ]);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      const message = getMutationErrorMessage(
        error,
        "Failed to send message. Please try again."
      );
      Alert.alert("Error", message, [{ text: "OK" }]);
    }
  };

  return (
    <ScreenLayout
      footer={
        <ThemedButton
          title={loading ? "Sending..." : "Send"}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        />
      }
    >
      <VStack container>
        <ContactForm
          onChangeName={(text) => setValue("name", text)}
          onChangeEmail={(text) => setValue("email", text)}
          onChangeMessage={(text) => setValue("message", text)}
          errors={{
            name: errors.name?.message,
            email: errors.email?.message,
            message: errors.message?.message,
          }}
        />
      </VStack>
    </ScreenLayout>
  );
};

export default ContactScreen;
