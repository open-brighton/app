import { VStack } from "@/components/VStack";
import { TextField } from "@/fields/TextField";
import React from "react";

const MIN_MESSAGE_HEIGHT = 100;

export interface FeedbackFormErrors {
  email?: string;
  category?: string;
  message?: string;
}

interface FeedbackFormProps {
  onChangeEmail: (text: string) => void;
  onChangeCategory: (text: string) => void;
  onChangeMessage: (text: string) => void;
  errors?: FeedbackFormErrors;
}

export function FeedbackForm({
  onChangeEmail,
  onChangeCategory,
  onChangeMessage,
  errors = {},
}: FeedbackFormProps) {
  const [messageHeight, setMessageHeight] = React.useState(MIN_MESSAGE_HEIGHT);

  return (
    <VStack gap={20}>
      <TextField
        label="Email"
        placeholder="Your email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={onChangeEmail}
        error={errors.email}
      />
      <TextField
        label="Category"
        placeholder="e.g. Bug report, Suggestion, General"
        onChangeText={onChangeCategory}
        error={errors.category}
      />
      <TextField
        label="Message"
        placeholder="Your feedback"
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
