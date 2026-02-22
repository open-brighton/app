import type { ReactNode } from "react";
import {
  type StyleProp,
  type ViewStyle,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type CardProps = {
  /** Optional content above the body (e.g. image). */
  imageArea?: ReactNode;
  /** Main content. */
  children: ReactNode;
  /** When provided, the card is pressable and shows press feedback. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  /** Extra style for the inner container (themed background). */
  contentStyle?: StyleProp<ViewStyle>;
};

const ELEVATION = 3;
const SHADOW_RADIUS = 8;
const SHADOW_OPACITY = 0.12;

/**
 * Elevated card. Use imageArea for a top media strip and children for the body.
 * Pass onPress to make it clickable (with press feedback).
 */
export function Card({
  imageArea,
  children,
  onPress,
  style,
  contentStyle,
}: CardProps) {
  const backgroundColor = useThemeColor({}, "background");
  const elevatedStyle: ViewStyle = {
    backgroundColor,
    ...Platform.select({
      android: {
        elevation: ELEVATION,
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: SHADOW_OPACITY,
        shadowRadius: SHADOW_RADIUS,
      },
    }),
  };

  const content = (
    <View style={[styles.inner, contentStyle]}>
      {imageArea != null ? (
        <View style={styles.imageArea}>{imageArea}</View>
      ) : null}
      <View style={styles.body}>{children}</View>
    </View>
  );

  if (onPress != null) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.outer,
          elevatedStyle,
          pressed && styles.pressed,
          style,
        ]}
        accessibilityRole="button"
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View style={[styles.outer, elevatedStyle, style]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.9,
  },
  inner: {
    borderRadius: 12,
    overflow: "hidden",
  },
  imageArea: {
    overflow: "hidden",
  },
  body: {
    padding: 16,
    gap: 4,
  },
});
