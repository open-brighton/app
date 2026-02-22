import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

interface ProgressProps {
  progress?: number; // 0 to 1
  size?: number;
  autoPlay?: boolean;
  loop?: boolean;
  onAnimationFinish?: () => void;
  style?: any;
}

export function Progress({
  progress = 0,
  size = 200,
  autoPlay = true,
  loop = false,
  onAnimationFinish,
  style,
}: ProgressProps) {
  const { colorScheme } = useColorScheme();
  const lottieRef = useRef<LottieView>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  // Calculate the progress frame based on the progress value (0-1)
  const totalFrames = 181; // From the Lottie animation JSON
  const progressFrame = Math.floor(progress * totalFrames);

  useEffect(() => {
    if (lottieRef.current) {
      if (progress > 0) {
        // Seek to the specific frame based on progress
        lottieRef.current.play(progressFrame, progressFrame);
      } else {
        // Reset to beginning
        lottieRef.current.reset();
      }
    }
  }, [progress, progressFrame]);

  const handleAnimationFinish = () => {
    setIsPlaying(false);
    onAnimationFinish?.();
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          backgroundColor:
            colorScheme === "dark"
              ? Colors.dark.background
              : Colors.light.background,
        },
        style,
      ]}
    >
      <LottieView
        ref={lottieRef}
        source={require("@/assets/animations/lottie/animations/animation-no-bg.json")}
        autoPlay={autoPlay}
        loop={loop}
        onAnimationFinish={handleAnimationFinish}
        style={[styles.lottie, { width: size, height: size }]}
        speed={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    alignSelf: "center",
  },
});
