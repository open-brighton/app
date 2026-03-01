import { ThemedText } from "@/components/ThemedText";
import { VStack } from "@/components/VStack";
import { TextField } from "@/fields/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { z } from "zod";

const AMOUNT_PRESETS_CENTS = [500, 1000, 2500, 5000]; // $5, $10, $25, $50

const donateSchema = z
  .object({
    donationType: z.enum(["one_time", "recurring"]),
    amountCents: z.number().min(1, "Please choose or enter an amount"),
    interval: z.enum(["MONTHLY", "YEARLY"]).optional(),
    name: z.string().optional(),
    email: z
      .string()
      .email("Invalid email")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) =>
      data.donationType !== "recurring" ||
      data.interval === "MONTHLY" ||
      data.interval === "YEARLY",
    { message: "Please select a billing interval", path: ["interval"] }
  );

export type DonateFormData = z.infer<typeof donateSchema>;

export interface DonateFormRef {
  submit: () => void;
  reset: () => void;
}

interface DonateFormProps {
  onValidSubmit: (data: DonateFormData) => void;
}

export const DonateForm = forwardRef<DonateFormRef, DonateFormProps>(
  function DonateForm({ onValidSubmit }, ref) {
    const {
      register,
      setValue,
      watch,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<DonateFormData>({
      resolver: zodResolver(donateSchema),
      defaultValues: {
        donationType: "one_time",
        amountCents: 0,
        interval: "MONTHLY",
        name: "",
        email: "",
      },
    });

    useImperativeHandle(ref, () => ({
      submit: handleSubmit(onValidSubmit),
      reset,
    }));

    const donationType = watch("donationType") ?? "one_time";
    const currentAmountCents = watch("amountCents") ?? 0;
    const currentInterval = watch("interval") ?? "MONTHLY";

    useEffect(() => {
      register("donationType");
      register("amountCents");
      register("interval");
      register("name");
      register("email");
    }, [register]);

    return (
      <VStack gap={20}>
        <View>
          <ThemedText type="default" style={styles.fieldLabel}>
            Donation type
          </ThemedText>
          <View style={styles.segmentRow}>
            <Pressable
              style={[
                styles.segmentOption,
                donationType === "one_time" && styles.segmentOptionActive,
              ]}
              onPress={() => setValue("donationType", "one_time")}
            >
              <ThemedText
                type="defaultSemiBold"
                style={
                  donationType === "one_time"
                    ? styles.segmentTextActive
                    : styles.segmentText
                }
              >
                One-time
              </ThemedText>
            </Pressable>
            <Pressable
              style={[
                styles.segmentOption,
                donationType === "recurring" && styles.segmentOptionActive,
              ]}
              onPress={() => setValue("donationType", "recurring")}
            >
              <ThemedText
                type="defaultSemiBold"
                style={
                  donationType === "recurring"
                    ? styles.segmentTextActive
                    : styles.segmentText
                }
              >
                Recurring
              </ThemedText>
            </Pressable>
          </View>
        </View>

        {donationType === "recurring" && (
          <View>
            <ThemedText type="default" style={styles.fieldLabel}>
              Billing interval
            </ThemedText>
            <View style={styles.segmentRow}>
              <Pressable
                style={[
                  styles.segmentOption,
                  currentInterval === "MONTHLY" && styles.segmentOptionActive,
                ]}
                onPress={() => setValue("interval", "MONTHLY")}
              >
                <ThemedText
                  type="defaultSemiBold"
                  style={
                    currentInterval === "MONTHLY"
                      ? styles.segmentTextActive
                      : styles.segmentText
                  }
                >
                  Monthly
                </ThemedText>
              </Pressable>
              <Pressable
                style={[
                  styles.segmentOption,
                  currentInterval === "YEARLY" && styles.segmentOptionActive,
                ]}
                onPress={() => setValue("interval", "YEARLY")}
              >
                <ThemedText
                  type="defaultSemiBold"
                  style={
                    currentInterval === "YEARLY"
                      ? styles.segmentTextActive
                      : styles.segmentText
                  }
                >
                  Yearly
                </ThemedText>
              </Pressable>
            </View>
          </View>
        )}

        <View>
          <ThemedText type="default" style={styles.fieldLabel}>
            Amount
          </ThemedText>
          <View style={styles.amountRow}>
            {AMOUNT_PRESETS_CENTS.map((cents) => (
              <Pressable
                key={cents}
                style={[
                  styles.amountChip,
                  currentAmountCents === cents && styles.amountChipActive,
                ]}
                onPress={() => setValue("amountCents", cents)}
              >
                <ThemedText
                  type="defaultSemiBold"
                  style={
                    currentAmountCents === cents
                      ? styles.amountChipTextActive
                      : styles.amountChipText
                  }
                >
                  ${cents / 100}
                </ThemedText>
              </Pressable>
            ))}
          </View>
          <TextField
            label="Custom amount (USD)"
            placeholder="0"
            keyboardType="number-pad"
            value={
              AMOUNT_PRESETS_CENTS.includes(currentAmountCents)
                ? ""
                : String(currentAmountCents / 100)
            }
            onChangeText={(text) => {
              const parsed = parseInt(text.replace(/\D/g, ""), 10);
              setValue("amountCents", isNaN(parsed) ? 0 : parsed * 100);
            }}
            error={errors.amountCents?.message}
          />
        </View>

        <TextField
          label="Name (optional)"
          placeholder="Your name"
          onChangeText={(text) => setValue("name", text)}
          error={errors.name?.message}
        />
        <TextField
          label="Email (optional)"
          placeholder="Your email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setValue("email", text)}
          error={errors.email?.message}
        />
      </VStack>
    );
  }
);

const styles = StyleSheet.create({
  fieldLabel: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  segmentRow: {
    flexDirection: "row",
    gap: 8,
  },
  segmentOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  segmentOptionActive: {
    borderColor: "#c7aa3c",
    backgroundColor: "rgba(199, 170, 60, 0.15)",
  },
  segmentText: {
    color: "#666",
  },
  segmentTextActive: {
    color: "#c7aa3c",
  },
  amountRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  amountChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  amountChipActive: {
    borderColor: "#c7aa3c",
    backgroundColor: "rgba(199, 170, 60, 0.15)",
  },
  amountChipText: {
    color: "#333",
  },
  amountChipTextActive: {
    color: "#c7aa3c",
  },
});
