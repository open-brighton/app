import type { Message } from "@/types/chat";
import React, { createContext, useCallback, useContext, useState } from "react";

type ChatContextValue = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  resetChat: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);

  const resetChat = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <ChatContext.Provider value={{ messages, setMessages, resetChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext(): ChatContextValue {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
