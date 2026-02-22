import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import type { StyleProp, ViewStyle } from "react-native";

/** Shared Lottie animation source used across the app (splash, drawer, home, progress). */
export const LOTTIE_ANIMATION_SOURCE = require("@/assets/animations/lottie/animations/animation-no-bg.json");

const TOTAL_FRAMES = 181;

export interface LottieAnimationProps {
  autoPlay?: boolean;
  loop?: boolean;
  style?: StyleProp<ViewStyle>;
  onAnimationFinish?: () => void;
  /** When set (0–1), seeks to frame instead of playing; useful for progress indicators. */
  progress?: number;
  speed?: number;
}

export const LottieAnimation = React.forwardRef<
  LottieView,
  LottieAnimationProps
>(function LottieAnimation(
  {
    autoPlay = true,
    loop = false,
    style,
    onAnimationFinish,
    progress,
    speed = 1,
  },
  forwardedRef
) {
  const internalRef = useRef<LottieView>(null);
  const progressFrame =
    progress !== undefined
      ? Math.floor(Math.max(0, Math.min(1, progress)) * TOTAL_FRAMES)
      : undefined;

  useEffect(() => {
    if (progress === undefined) return;
    const node = internalRef.current;
    if (!node) return;
    if (progress > 0) {
      node.play(progressFrame!, progressFrame!);
    } else {
      node.reset();
    }
  }, [progress, progressFrame]);

  const setRef = (instance: LottieView | null) => {
    internalRef.current = instance;
    if (typeof forwardedRef === "function") {
      forwardedRef(instance);
    } else if (forwardedRef) {
      (forwardedRef as React.MutableRefObject<LottieView | null>).current =
        instance;
    }
  };

  return (
    <LottieView
      ref={setRef}
      source={LOTTIE_ANIMATION_SOURCE}
      autoPlay={progress === undefined ? autoPlay : false}
      loop={progress === undefined ? loop : false}
      onAnimationFinish={onAnimationFinish}
      style={style}
      speed={speed}
    />
  );
});
