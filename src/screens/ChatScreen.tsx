import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import type { Message } from "@/types/chat";
import { CHAT_EMPTY_PROMPT } from "@/types/chat";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  ListRenderItem,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const USER_BUBBLE_COLOR_LIGHT = "#0a7ea4";
const USER_BUBBLE_COLOR_DARK = "#fff";
const ASSISTANT_BUBBLE_LIGHT = "#e5e7eb";
const ASSISTANT_BUBBLE_DARK = "#374151";
const INPUT_BORDER_LIGHT = "#ccc";
const INPUT_BORDER_DARK = "#6b7280";

function ChatMessageBubble({ item }: { item: Message }) {
  const { colorScheme } = useColorScheme();
  const isUser = item.role === "user";
  const backgroundColor = isUser
    ? colorScheme === "dark"
      ? USER_BUBBLE_COLOR_DARK
      : USER_BUBBLE_COLOR_LIGHT
    : colorScheme === "dark"
      ? ASSISTANT_BUBBLE_DARK
      : ASSISTANT_BUBBLE_LIGHT;
  const textColor = isUser ? "#fff" : undefined;

  return (
    <View
      style={[
        styles.bubbleWrap,
        isUser ? styles.bubbleWrapUser : styles.bubbleWrapAssistant,
      ]}
      accessibilityLabel={isUser ? "User message" : "Assistant message"}
      accessibilityRole="text"
    >
      <View style={[styles.bubble, { backgroundColor }]}>
        <ThemedText
          style={[styles.bubbleText, textColor ? { color: textColor } : undefined]}
          lightColor={textColor}
          darkColor={textColor}
        >
          {item.content}
        </ThemedText>
      </View>
    </View>
  );
}

function TypingIndicator() {
  const { colorScheme } = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? ASSISTANT_BUBBLE_DARK : ASSISTANT_BUBBLE_LIGHT;

  return (
    <View style={[styles.bubbleWrap, styles.bubbleWrapAssistant]}>
      <View style={[styles.bubble, { backgroundColor }]}>
        <ThemedText style={styles.bubbleText}>Thinking…</ThemedText>
      </View>
    </View>
  );
}

export function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const insets = useSafeAreaInsets();
  const background = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const { colorScheme } = useColorScheme();
  const inputBorderColor =
    colorScheme === "dark" ? INPUT_BORDER_DARK : INPUT_BORDER_LIGHT;
  const tintColor =
    colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint;

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const show = Keyboard.addListener(showEvent, (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hide = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = inputText.trim();
    if (!trimmed || isAssistantTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [userMessage, ...prev]);
    setInputText("");
    setIsAssistantTyping(true);

    // Placeholder: simulate assistant reply for UX demo. Replace with real LLM call later.
    const placeholderAssistant: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: "Reply placeholder — hook up your LLM here.",
      timestamp: new Date().toISOString(),
    };
    setTimeout(() => {
      setMessages((prev) => [placeholderAssistant, ...prev]);
      setIsAssistantTyping(false);
    }, 800);
  }, [inputText, isAssistantTyping]);

  const canSend = inputText.trim().length > 0 && !isAssistantTyping;

  const renderItem: ListRenderItem<Message> = useCallback(({ item }) => {
    return <ChatMessageBubble item={item} />;
  }, []);

  const listHeaderComponent = isAssistantTyping ? <TypingIndicator /> : null;

  const listEmptyComponent = (
    <View style={styles.emptyWrap}>
      <ThemedText style={styles.emptyText}>{CHAT_EMPTY_PROMPT}</ThemedText>
    </View>
  );

  const inputRowMarginBottom =
    keyboardHeight > 0 ? keyboardHeight - 12 : Math.max(8, insets.bottom - 16);

  return (
    <ThemedSafeAreaView edges={["top", "left", "right"]}>
      <View style={styles.keyboardView}>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted
          style={styles.list}
          contentContainerStyle={[
            styles.listContent,
            messages.length === 0 && styles.listContentEmpty,
          ]}
          ListHeaderComponent={listHeaderComponent}
          ListEmptyComponent={listEmptyComponent}
          keyboardShouldPersistTaps="handled"
        />

        <View
          style={[
            styles.inputRow,
            {
              borderTopColor: inputBorderColor,
              marginBottom: inputRowMarginBottom,
            },
          ]}
        >
          <TextInput
            style={[
              styles.input,
              {
                color: textColor,
                borderColor: inputBorderColor,
                backgroundColor: background,
              },
            ]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Message…"
            placeholderTextColor={colorScheme === "dark" ? "#9CA3AF" : "#6b7280"}
            multiline
            maxLength={4000}
            editable={!isAssistantTyping}
          />
          <Pressable
            onPress={handleSend}
            disabled={!canSend}
            style={({ pressed }) => [
              styles.sendButton,
              {
                backgroundColor: canSend ? tintColor : inputBorderColor,
                opacity: pressed && canSend ? 0.8 : 1,
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Send message"
          >
            <ThemedText
              style={styles.sendButtonText}
              lightColor="#fff"
              darkColor="#0b235a"
            >
              Send
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexGrow: 1,
  },
  listContentEmpty: {
    flex: 1,
    justifyContent: "center",
  },
  bubbleWrap: {
    marginVertical: 4,
    maxWidth: "85%",
  },
  bubbleWrapUser: {
    alignSelf: "flex-end",
  },
  bubbleWrapAssistant: {
    alignSelf: "flex-start",
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  bubbleText: {
    fontSize: 16,
    lineHeight: 22,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 22,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ChatScreen;
