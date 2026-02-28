// Shared GraphQL enum types — kept in sync with graphql-service/graph/schema.graphqls.
// Fragment-specific types live co-located with their components.

export type FeedItemCategory = "COMMUNITY_EVENT" | "ANNOUNCEMENT" | "NEWS" | "ALERT";

export type EventCategory = "COMMUNITY" | "ARTS" | "SPORTS" | "FOOD" | "ENVIRONMENT" | "POLITICS";

export type BusinessCategory =
  | "BAKERY"
  | "CAFE"
  | "RESTAURANT"
  | "MUSEUM"
  | "RETAIL"
  | "HEALTH_FOOD"
  | "VINTAGE"
  | "CHOCOLATIER";

export type DonateSubscriptionInterval = "MONTHLY" | "YEARLY";

// ─── Mutation types (shared by form components) ───────────────────────────────

export interface SubmitContactInput {
  email: string;
  name: string;
  message: string;
}

export interface SubmitContactResponse {
  submitContact: boolean;
}

export interface SubmitFeedbackInput {
  email: string;
  category: string;
  message: string;
}

export interface SubmitFeedbackResponse {
  submitFeedback: boolean;
}

export interface CreateDonatePaymentIntentInput {
  amount: number;
  currency: string;
  email?: string;
  name?: string;
}

export interface CreateDonatePaymentIntentResponse {
  createDonatePaymentIntent: { clientSecret: string };
}

export interface CreateDonateSubscriptionInput {
  amount: number;
  currency: string;
  interval: DonateSubscriptionInterval;
  email?: string;
  name?: string;
}

export interface CreateDonateSubscriptionResponse {
  createDonateSubscription: { clientSecret: string };
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
