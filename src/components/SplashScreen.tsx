import { LottieAnimation } from "@/components/LottieAnimation";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

export function SplashScreen({
  onFinish,
  fadeDuration = 500,
  shouldFadeOut = false,
}: {
  onFinish?: () => void;
  fadeDuration?: number;
  shouldFadeOut?: boolean;
}) {
  const { colorScheme } = useColorScheme();
  const [animationDone, setAnimationDone] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  useEffect(() => {
    if (animationDone) {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          onFinish?.();
        });
      }, fadeDuration); // 0.5s pause after animation
    }
  }, [animationDone, fadeDuration, onFinish]);

  // NOTE: Since the animated view animates opacity but we want the backgroudn to remain the same color, we need to wrap the animated view in a view with the background color.
  return (
    <View style={[styles.staticView, { backgroundColor }]}>
      <Animated.View
        style={[
          styles.animatedView,
          { opacity: shouldFadeOut ? fadeAnim : 1, backgroundColor },
        ]}
      >
        <LottieAnimation
          autoPlay
          loop={false}
          onAnimationFinish={() => setAnimationDone(true)}
          style={styles.lottie}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  staticView: {
    ...StyleSheet.absoluteFillObject,
  },
  animatedView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  lottie: {
    width: 300,
    height: 300,
  },
});
