export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp?: Date | string;
}

export const CHAT_EMPTY_PROMPT = "Ask me anything";
