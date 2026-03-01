import { VStack } from "@/components/VStack";
import { TextField } from "@/fields/TextField";
import React from "react";

const MIN_MESSAGE_HEIGHT = 100;

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactFormProps {
  onChangeName: (text: string) => void;
  onChangeEmail: (text: string) => void;
  onChangeMessage: (text: string) => void;
  errors?: ContactFormErrors;
}

export function ContactForm({
  onChangeName,
  onChangeEmail,
  onChangeMessage,
  errors = {},
}: ContactFormProps) {
  const [messageHeight, setMessageHeight] = React.useState(MIN_MESSAGE_HEIGHT);

  return (
    <VStack gap={20}>
      <TextField
        label="Name"
        placeholder="Your name"
        onChangeText={onChangeName}
        error={errors.name}
      />
      <TextField
        label="Email"
        placeholder="Your email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={onChangeEmail}
        error={errors.email}
      />
      <TextField
        label="Message"
        placeholder="Your message"
        multiline
        inputStyle={{ height: messageHeight, textAlignVertical: "top" }}
        onContentSizeChange={(e) =>
          setMessageHeight(
            Math.max(MIN_MESSAGE_HEIGHT, e.nativeEvent.contentSize.height)
          )
        }
        onChangeText={onChangeMessage}
        error={errors.message}
      />
    </VStack>
  );
}
