import { ScreenLayout } from "@/components/ScreenLayout";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { VStack } from "@/components/VStack";
import { DonateForm, DonateFormData, DonateFormRef } from "@/forms/DonateForm";
import { getMutationErrorMessage } from "@/lib/errors";
import {
  CREATE_DONATE_PAYMENT_INTENT,
  CREATE_DONATE_SUBSCRIPTION,
} from "@/lib/graphql/mutations";
import type {
  CreateDonatePaymentIntentInput,
  CreateDonatePaymentIntentResponse,
  CreateDonateSubscriptionInput,
  CreateDonateSubscriptionResponse,
  DonateSubscriptionInterval,
} from "@/lib/graphql/types";
import { useMutation } from "@apollo/client";
import { useStripe } from "@stripe/stripe-react-native";
import * as Linking from "expo-linking";
import React, { useRef } from "react";
import { Alert } from "react-native";

const DEFAULT_CURRENCY = "usd";

export const DonateScreen = () => {
  const formRef = useRef<DonateFormRef>(null);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [createPaymentIntent, { loading: loadingPayment }] = useMutation<
    CreateDonatePaymentIntentResponse,
    { input: CreateDonatePaymentIntentInput }
  >(CREATE_DONATE_PAYMENT_INTENT);

  const [createSubscription, { loading: loadingSubscription }] = useMutation<
    CreateDonateSubscriptionResponse,
    { input: CreateDonateSubscriptionInput }
  >(CREATE_DONATE_SUBSCRIPTION);

  const loading = loadingPayment || loadingSubscription;

  const presentSheet = async (clientSecret: string) => {
    if (!initPaymentSheet || !presentPaymentSheet) {
      Alert.alert("Error", "Payment is not available. Please try again later.");
      return;
    }
    const { error: initError } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: "Open Brighton",
      returnURL: Linking.createURL("donate"),
    });
    if (initError) {
      Alert.alert("Error", initError.message ?? "Failed to initialize payment.");
      return;
    }
    const { error: presentError } = await presentPaymentSheet();
    if (presentError) {
      if (presentError.code === "Canceled") return;
      Alert.alert("Error", presentError.message ?? "Payment failed.");
      return;
    }
    Alert.alert(
      "Thank you",
      "Your donation was successful. We appreciate your support!",
      [{ text: "OK", onPress: () => formRef.current?.reset() }]
    );
  };

  const onValidSubmit = async (data: DonateFormData) => {
    try {
      const amount = data.amountCents;
      const currency = DEFAULT_CURRENCY;
      const name = data.name?.trim() || undefined;
      const email = data.email?.trim() || undefined;

      if (data.donationType === "one_time") {
        const result = await createPaymentIntent({
          variables: { input: { amount, currency, email, name } },
        });
        const clientSecret = result.data?.createDonatePaymentIntent?.clientSecret;
        if (!clientSecret) {
          Alert.alert("Error", "Could not start payment. Please try again.");
          return;
        }
        await presentSheet(clientSecret);
      } else {
        const interval = data.interval ?? "MONTHLY";
        const result = await createSubscription({
          variables: {
            input: {
              amount,
              currency,
              interval: interval as DonateSubscriptionInterval,
              email,
              name,
            },
          },
        });
        const clientSecret = result.data?.createDonateSubscription?.clientSecret;
        if (!clientSecret) {
          Alert.alert("Error", "Could not start subscription. Please try again.");
          return;
        }
        await presentSheet(clientSecret);
      }
    } catch (error) {
      console.error("Donate form error:", error);
      const message = getMutationErrorMessage(
        error,
        "Something went wrong. Please check your connection and try again."
      );
      Alert.alert("Error", message);
    }
  };

  return (
    <ScreenLayout
      footer={
        <ThemedButton
          title={loading ? "Preparing..." : "Donate"}
          onPress={() => formRef.current?.submit()}
          disabled={loading}
        />
      }
    >
      <VStack container gap={20}>
        <ThemedText type="default">
          This is a project built by and for the community — and it has real
          costs. If you&apos;re getting value out of it and you&apos;d like to
          see it keep going, please help keep the lights on.
        </ThemedText>
        <DonateForm ref={formRef} onValidSubmit={onValidSubmit} />
      </VStack>
    </ScreenLayout>
  );
};

export default DonateScreen;
