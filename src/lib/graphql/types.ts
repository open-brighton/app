export interface SubmitContactInput {
  email: string;
  name: string;
  message: string;
}

export interface SubmitContactResponse {
  submitContact: string;
}

export interface SubmitFeedbackInput {
  email: string;
  category: string;
  message: string;
}

export interface SubmitFeedbackResponse {
  submitFeedback: string;
}

export interface CreateDonatePaymentIntentInput {
  amount: number;
  currency: string;
  email?: string;
  name?: string;
}

export interface CreateDonatePaymentIntentResponse {
  createDonatePaymentIntent: {
    clientSecret: string;
  };
}

export type DonateSubscriptionInterval = "MONTHLY" | "YEARLY";

export interface CreateDonateSubscriptionInput {
  amount: number;
  currency: string;
  interval: DonateSubscriptionInterval;
  email?: string;
  name?: string;
}

export interface CreateDonateSubscriptionResponse {
  createDonateSubscription: {
    clientSecret: string;
  };
}

export interface ChatMessageInput {
  role: "user" | "assistant";
  content: string;
}

export interface ChatInput {
  messages: ChatMessageInput[];
}

export interface ChatResponse {
  chat: string;
}