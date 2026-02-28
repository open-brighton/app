import { gql, useLazyQuery } from "@apollo/client";
import type { ComponentType } from "react";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import type { NuxStepScreenProps } from "@/constants/nux";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import type { ValidateAddressResponse } from "@/lib/graphql/types";
import { HomeParallaxContent } from "@/screens/HomeScreen";

/**
 * Registry of custom step screen components.
 * Key by step.screen; GuideScreen renders the component and still provides the Next button.
 */
export const NUX_STEP_SCREENS: Record<
  string,
  ComponentType<NuxStepScreenProps>
> = {
  welcome: WelcomeStepScreen,
  "user-onboarding": UserOnboardingStepScreen,
};

function WelcomeStepScreen(_props: NuxStepScreenProps) {
  return (
    <View style={styles.content}>
      <HomeParallaxContent extraPaddingBottom={80} />
    </View>
  );
}

// ─── User Onboarding ──────────────────────────────────────────────────────────

type OnboardingStage =
  | "welcome"
  | "resident-question"
  | "address-input"
  | "address-confirmed"
  | "non-resident";

const VALIDATE_ADDRESS = gql`
  query ValidateAddress($address: String!) {
    validateAddress(address: $address) {
      valid
      normalizedAddress
      message
    }
  }
`;

function UserOnboardingStepScreen({ onNext }: NuxStepScreenProps) {
  const [stage, setStage] = useState<OnboardingStage>("welcome");
  const [address, setAddress] = useState("");
  const [validatedAddress, setValidatedAddress] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const inputBg = isDark ? Colors.dark.itemBackground : Colors.light.itemBackground;

  const [validateAddress, { loading }] = useLazyQuery<ValidateAddressResponse>(
    VALIDATE_ADDRESS,
    {
      onCompleted: (data) => {
        if (data.validateAddress.valid) {
          setValidatedAddress(
            data.validateAddress.normalizedAddress ?? address
          );
          setValidationError(null);
          setStage("address-confirmed");
        } else {
          setValidationError(
            data.validateAddress.message ??
              "We couldn't verify that address. Please try again."
          );
        }
      },
      onError: () => {
        setValidationError(
          "We couldn't verify that address right now. Please try again."
        );
      },
    }
  );

  const handleValidateAddress = () => {
    setValidationError(null);
    validateAddress({ variables: { address: address.trim() } });
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {stage === "welcome" && (
          <View style={styles.stageContainer}>
            <View style={styles.iconCircle}>
              <ThemedText style={styles.iconEmoji}>🏘️</ThemedText>
            </View>
            <ThemedText type="title" style={styles.stageTitle}>
              Welcome to OpenBrighton
            </ThemedText>
            <ThemedText type="default" style={[styles.stageBody, { color: iconColor }]}>
              OpenBrighton is an app built to make it easier for residents to
              connect with and participate in the Brighton community — from local
              news and events to neighborhood services and businesses.
            </ThemedText>
            <ThemedButton
              title="Get Started"
              style={styles.primaryButton}
              onPress={() => setStage("resident-question")}
            />
          </View>
        )}

        {stage === "resident-question" && (
          <View style={styles.stageContainer}>
            <View style={styles.iconCircle}>
              <ThemedText style={styles.iconEmoji}>📍</ThemedText>
            </View>
            <ThemedText type="title" style={styles.stageTitle}>
              Do you live in Brighton?
            </ThemedText>
            <ThemedText type="default" style={[styles.stageBody, { color: iconColor }]}>
              Letting us know helps us tailor information to your neighborhood —
              like yard debris pickup schedules, local alerts, and more.
            </ThemedText>
            <ThemedButton
              title="Yes, I live in Brighton"
              style={styles.primaryButton}
              onPress={() => setStage("address-input")}
            />
            <ThemedButton
              title="No, just exploring"
              variant="outline"
              style={styles.secondaryButton}
              onPress={() => setStage("non-resident")}
            />
          </View>
        )}

        {stage === "address-input" && (
          <View style={styles.stageContainer}>
            <View style={styles.iconCircle}>
              <ThemedText style={styles.iconEmoji}>🏠</ThemedText>
            </View>
            <ThemedText type="title" style={styles.stageTitle}>
              What&apos;s your address?
            </ThemedText>
            <ThemedText type="default" style={[styles.stageBody, { color: iconColor }]}>
              Your address is used only to provide accurate neighborhood
              information — like yard debris pickup notifications and
              hyper-local alerts. It is never shared.
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                { color: textColor, backgroundColor: inputBg, borderColor: iconColor },
              ]}
              placeholder="e.g. 123 Market St, Brighton"
              placeholderTextColor={iconColor}
              value={address}
              onChangeText={(v) => {
                setAddress(v);
                setValidationError(null);
              }}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleValidateAddress}
            />
            {validationError ? (
              <ThemedText style={styles.errorText}>{validationError}</ThemedText>
            ) : null}
            {loading ? (
              <ActivityIndicator
                style={styles.loader}
                color={Colors.light.tint}
              />
            ) : (
              <>
                <ThemedButton
                  title="Confirm Address"
                  style={styles.primaryButton}
                  disabled={!address.trim()}
                  onPress={handleValidateAddress}
                />
                <ThemedButton
                  title="Skip for now"
                  variant="outline"
                  style={styles.secondaryButton}
                  onPress={onNext}
                />
              </>
            )}
          </View>
        )}

        {stage === "address-confirmed" && (
          <View style={styles.stageContainer}>
            <View style={[styles.iconCircle, styles.successCircle]}>
              <ThemedText style={styles.iconEmoji}>✅</ThemedText>
            </View>
            <ThemedText type="title" style={styles.stageTitle}>
              You&apos;re all set!
            </ThemedText>
            <ThemedText type="default" style={[styles.stageBody, { color: iconColor }]}>
              We&apos;ve confirmed your address at{" "}
              <ThemedText type="defaultSemiBold">{validatedAddress}</ThemedText>
              . You&apos;ll now receive personalized information for your
              neighborhood.
            </ThemedText>
            <ThemedButton
              title="Explore OpenBrighton"
              style={styles.primaryButton}
              onPress={onNext}
            />
          </View>
        )}

        {stage === "non-resident" && (
          <View style={styles.stageContainer}>
            <View style={styles.iconCircle}>
              <ThemedText style={styles.iconEmoji}>👋</ThemedText>
            </View>
            <ThemedText type="title" style={styles.stageTitle}>
              All good!
            </ThemedText>
            <ThemedText type="default" style={[styles.stageBody, { color: iconColor }]}>
              Feel free to use OpenBrighton as a resource for anything you
              need — local businesses, community events, news, and more. You&apos;re
              always welcome here.
            </ThemedText>
            <ThemedButton
              title="Explore the App"
              style={styles.primaryButton}
              onPress={onNext}
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 28,
    justifyContent: "center",
  },
  stageContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 24,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "rgba(10, 126, 164, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  successCircle: {
    backgroundColor: "rgba(34, 197, 94, 0.12)",
  },
  iconEmoji: {
    fontSize: 40,
  },
  stageTitle: {
    textAlign: "center",
    marginBottom: 16,
  },
  stageBody: {
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  primaryButton: {
    width: "100%",
    marginBottom: 12,
  },
  secondaryButton: {
    width: "100%",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  loader: {
    marginVertical: 16,
  },
});
