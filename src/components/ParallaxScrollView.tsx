import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";

const HEADER_HEIGHT = 250;

interface Props extends PropsWithChildren {
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  /** Extra bottom padding (e.g. for a fixed footer). */
  extraPaddingBottom?: number;
}

export function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  extraPaddingBottom = 0,
}: Props) {
  const { colorScheme } = useColorScheme();
  const scheme = (colorScheme ?? "light") as "light" | "dark";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  const totalBottom = bottom + extraPaddingBottom;
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          // Parallax: header moves slower at first, then fully off by HEADER_HEIGHT
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT / 2, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT / 4, 0]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom: totalBottom }}
        contentContainerStyle={{ paddingBottom: totalBottom }}
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[scheme] },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
});
