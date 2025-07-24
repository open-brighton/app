import { Colors } from "@/constants/Colors";
import LottieView from "lottie-react-native";
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
  const [animationDone, setAnimationDone] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

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
    <View style={styles.staticView}>
      <Animated.View
        style={[styles.animatedView, { opacity: shouldFadeOut ? fadeAnim : 1 }]}
      >
        <LottieView
          source={require("@/assets/animations/lottie/animations/animation.json")}
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
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  animatedView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.dark.background,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  lottie: {
    width: 300,
    height: 300,
  },
});
