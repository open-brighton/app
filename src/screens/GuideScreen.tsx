import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { getNuxBySlug } from "@/constants/nux";
import { NUX_STEP_SCREENS } from "@/screens/nuxStepScreens";

export default function GuideScreen() {
  const { slug, redirect } = useLocalSearchParams<{
    slug: string;
    redirect?: string;
  }>();
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);

  const nux = slug ? getNuxBySlug(slug) : undefined;

  React.useEffect(() => {
    if (!slug || !nux) {
      router.replace("/(tabs)" as never);
      return;
    }
  }, [slug, nux, router]);

  if (!nux) {
    return null;
  }

  const step = nux.steps[stepIndex];
  const isLastStep = stepIndex >= nux.steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      const target = redirect ?? nux.defaultRedirect;
      router.replace(target as never);
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const nextButton = (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
      onPress={handleNext}
      accessibilityRole="button"
      accessibilityLabel={isLastStep ? "Get started" : "Next"}
    >
      <ThemedText style={styles.buttonText}>
        {isLastStep ? "Get started" : "Next"}
      </ThemedText>
    </Pressable>
  );

  const StepScreenComponent = step?.screen
    ? NUX_STEP_SCREENS[step.screen]
    : undefined;

  if (StepScreenComponent && step) {
    return (
      <ThemedSafeAreaView
        edges={["top", "left", "right", "bottom"]}
        style={styles.welcomeContainer}
      >
        <View style={styles.welcomeScroll}>
          <StepScreenComponent
            step={step}
            stepIndex={stepIndex}
            totalSteps={nux.steps.length}
            isLastStep={isLastStep}
            onNext={handleNext}
            defaultRedirect={nux.defaultRedirect}
            redirect={redirect}
            nux={nux}
          />
        </View>
        {!step.hideFooter && (
          <View style={styles.footerFixed}>{nextButton}</View>
        )}
      </ThemedSafeAreaView>
    );
  }

  return (
    <ThemedSafeAreaView edges={["top", "left", "right", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scroll}
      >
        <View style={styles.content}>
          {step && (
            <>
              <ThemedText type="title" style={styles.title}>
                {step.title}
              </ThemedText>
              <ThemedText type="default" style={styles.body}>
                {step.body}
              </ThemedText>
            </>
          )}
        </View>
        <View style={styles.footer}>
          {nextButton}
        </View>
      </ScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
  },
  welcomeScroll: {
    flex: 1,
  },
  footerFixed: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 24,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
  },
  title: {
    marginBottom: 16,
  },
  body: {
    lineHeight: 24,
  },
  footer: {
    marginTop: 32,
  },
  button: {
    backgroundColor: "#0a7ea4",
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 12,
    textAlign: "center",
  },
});
