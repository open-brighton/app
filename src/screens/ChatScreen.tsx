import { LottieAnimation } from "@/components/LottieAnimation";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useChatContext } from "@/contexts/ChatContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CHAT } from "@/lib/graphql/mutations";
import type { ChatInput, ChatResponse } from "@/lib/graphql/types";
import type { Message } from "@/types/chat";
import { useMutation } from "@apollo/client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Keyboard,
  ListRenderItem,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Markdown from "react-native-markdown-display";

const EXAMPLE_PROMPTS = [
  "What's on in Brighton this weekend?",
  "Where can I park in Brighton?",
  "What are the best beaches nearby?",
  "How do I contact the council?",
];

const INPUT_BORDER_LIGHT = "#ccc";
const INPUT_BORDER_DARK = "#6b7280";

/** Returns theme-aware Markdown styles. Called once per colorScheme change. */
function buildMarkdownStyles(isDark: boolean) {
  const codeBg = isDark ? "#1f2937" : "#d1d5db";
  const textColor = isDark ? "#f3f4f6" : "#111827";
  return {
    body: { color: textColor, fontSize: 16, lineHeight: 22, margin: 0 },
    paragraph: { marginTop: 0, marginBottom: 6 },
    bullet_list: { marginVertical: 4 },
    ordered_list: { marginVertical: 4 },
    code_inline: { backgroundColor: codeBg, borderRadius: 4, paddingHorizontal: 4, fontFamily: "monospace" },
    fence: { backgroundColor: codeBg, borderRadius: 8, padding: 10, marginVertical: 6 },
    code_block: { backgroundColor: codeBg, borderRadius: 8, padding: 10, marginVertical: 6 },
    heading1: { fontSize: 20, fontWeight: "700", marginBottom: 4, marginTop: 6 },
    heading2: { fontSize: 18, fontWeight: "700", marginBottom: 4, marginTop: 6 },
    heading3: { fontSize: 16, fontWeight: "700", marginBottom: 2, marginTop: 4 },
    heading4: { fontSize: 15, fontWeight: "600", marginBottom: 2, marginTop: 4 },
    heading5: { fontSize: 14, fontWeight: "600", marginBottom: 2, marginTop: 4 },
    heading6: { fontSize: 14, fontWeight: "600", marginBottom: 2, marginTop: 4 },
    strong: { fontWeight: "700" },
  } as const;
}

function ChatMessageBubble({ item }: { item: Message }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const isUser = item.role === "user";

  const userBubbleBg = useThemeColor(
    { light: Colors.light.chatUserBubble, dark: Colors.dark.chatUserBubble },
    "chatUserBubble",
  );
  const assistantBubbleBg = useThemeColor(
    { light: Colors.light.chatAssistantBubble, dark: Colors.dark.chatAssistantBubble },
    "chatAssistantBubble",
  );

  const backgroundColor = isUser ? userBubbleBg : assistantBubbleBg;
  const userTextColor = isDark ? Colors.dark.background : "#fff";

  const markdownStyles = useMemo(() => buildMarkdownStyles(isDark), [isDark]);

  return (
    <View
      style={[styles.bubbleWrap, isUser ? styles.bubbleWrapUser : styles.bubbleWrapAssistant]}
      accessibilityLabel={isUser ? "User message" : "Assistant message"}
      accessibilityRole="text"
    >
      <View style={[styles.bubble, { backgroundColor }]}>
        {isUser ? (
          <ThemedText
            style={[styles.bubbleText, { color: userTextColor }]}
            lightColor={userTextColor}
            darkColor={userTextColor}
          >
            {item.content}
          </ThemedText>
        ) : (
          <Markdown style={markdownStyles}>{item.content}</Markdown>
        )}
      </View>
    </View>
  );
}

function TypingIndicator() {
  const assistantBubbleBg = useThemeColor(
    { light: Colors.light.chatAssistantBubble, dark: Colors.dark.chatAssistantBubble },
    "chatAssistantBubble",
  );

  return (
    <View style={[styles.bubbleWrap, styles.bubbleWrapAssistant]}>
      <View style={[styles.bubble, { backgroundColor: assistantBubbleBg }]}>
        <ThemedText style={styles.bubbleText}>Thinking…</ThemedText>
      </View>
    </View>
  );
}

export function ChatScreen() {
  const { messages, addMessage } = useChatContext();
  const [inputText, setInputText] = useState("");
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [sendChat] = useMutation<ChatResponse, { input: ChatInput }>(CHAT);

  const insets = useSafeAreaInsets();
  const background = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const { colorScheme } = useColorScheme();
  const inputBorderColor = colorScheme === "dark" ? INPUT_BORDER_DARK : INPUT_BORDER_LIGHT;

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

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isAssistantTyping) return;

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: new Date().toISOString(),
      };
      addMessage(userMessage);
      setInputText("");
      setIsAssistantTyping(true);

      const messagesForApi = [...messages, userMessage]
        .slice()
        .reverse()
        .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

      sendChat({ variables: { input: { messages: messagesForApi } } })
        .then(({ data }) => {
          addMessage({
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: data?.chat ?? "",
            timestamp: new Date().toISOString(),
          });
        })
        .catch(() => {
          addMessage({
            id: `error-${Date.now()}`,
            role: "assistant",
            content: "Something went wrong. Please try again.",
            timestamp: new Date().toISOString(),
          });
        })
        .finally(() => {
          setIsAssistantTyping(false);
        });
    },
    [isAssistantTyping, messages, addMessage, sendChat],
  );

  const handleSend = useCallback(() => {
    sendMessage(inputText);
  }, [inputText, sendMessage]);

  const canSend = inputText.trim().length > 0 && !isAssistantTyping;

  const renderItem: ListRenderItem<Message> = useCallback(({ item }) => {
    return <ChatMessageBubble item={item} />;
  }, []);

  const listHeaderComponent = isAssistantTyping ? <TypingIndicator /> : null;
  const inputRowMarginBottom = keyboardHeight > 0 ? keyboardHeight - insets.bottom : 0;

  return (
    <ThemedSafeAreaView edges={["left", "right"]}>
      <View style={styles.keyboardView}>
        <View style={styles.listContainer}>
          {messages.length === 0 && !isAssistantTyping && (
            <View style={styles.emptyWrap}>
              <LottieAnimation autoPlay loop style={styles.emptyLottie} />
            </View>
          )}
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            inverted
            style={styles.list}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={listHeaderComponent}
            keyboardShouldPersistTaps="handled"
          />
        </View>

        <View style={[styles.bottomSection, { backgroundColor: background }]}>
          {messages.length === 0 && !isAssistantTyping && (
            <>
              <ThemedText style={styles.promptsLabel}>Examples</ThemedText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.promptsRow}
                contentContainerStyle={styles.promptsContent}
                keyboardShouldPersistTaps="handled"
              >
                {EXAMPLE_PROMPTS.map((prompt) => (
                  <Pressable
                    key={prompt}
                    onPress={() => sendMessage(prompt)}
                    style={({ pressed }) => [
                      styles.promptChip,
                      { borderColor: inputBorderColor, opacity: pressed ? 0.7 : 1 },
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={prompt}
                  >
                    <ThemedText style={styles.promptChipText}>{prompt}</ThemedText>
                  </Pressable>
                ))}
              </ScrollView>
            </>
          )}

          <View
            style={[
              styles.inputRow,
              { borderTopColor: inputBorderColor, marginBottom: inputRowMarginBottom },
            ]}
          >
            <TextInput
              style={[
                styles.input,
                { color: textColor, borderColor: inputBorderColor, backgroundColor: background },
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
                darkColor={Colors.dark.background}
              >
                Send
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  listContainer: {
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
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  },
  emptyLottie: {
    width: 156,
    height: 156,
  },
  bottomSection: {
    flexShrink: 0,
  },
  promptsLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    paddingHorizontal: 16,
    paddingBottom: 8,
    opacity: 0.5,
  },
  promptsRow: {
    flexShrink: 0,
  },
  promptsContent: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 8,
    alignItems: "flex-start",
  },
  promptChip: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  promptChipText: {
    fontSize: 14,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
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
    height: 44,
    paddingHorizontal: 20,
    borderRadius: 22,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ChatScreen;
