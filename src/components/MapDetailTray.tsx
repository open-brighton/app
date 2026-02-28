import { Colors } from "@/constants/Colors";
import { MapFeature } from "@/contexts/ExploreContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type MapDetailTrayProps = {
  isOpen: boolean;
  feature: MapFeature | null;
  onClose: () => void;
};

const HANDLE_HEIGHT = 28;
const TRAY_HEIGHT = 200;
const SPRING = { damping: 22, stiffness: 280, mass: 0.9 } as const;

const FEATURE_META: Record<
  MapFeature["type"],
  { icon: keyof typeof Ionicons.glyphMap; color: string; label: string }
> = {
  park: { icon: "leaf-outline", color: "#2E7D32", label: "Town Park" },
  restaurant: { icon: "restaurant-outline", color: "#E53935", label: "Restaurant" },
  "debris-zone": { icon: "trash-outline", color: "#F57C00", label: "Yard Debris Zone" },
};

export function MapDetailTray({ isOpen, feature, onClose }: MapDetailTrayProps) {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const bg = isDark ? Colors.dark.background : Colors.light.background;
  const textColor = isDark ? Colors.dark.text : Colors.light.text;
  const iconColor = isDark ? Colors.dark.icon : Colors.light.icon;
  const dividerColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const handleColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";

  const bottomPad = Math.max(insets.bottom, 16);
  const trayHeight = HANDLE_HEIGHT + TRAY_HEIGHT + bottomPad;

  const translateY = useSharedValue(trayHeight);

  useEffect(() => {
    translateY.value = withSpring(isOpen ? 0 : trayHeight, SPRING);
  }, [isOpen, trayHeight]);

  const panGesture = Gesture.Pan()
    .activeOffsetY(8)
    .onUpdate((e) => {
      translateY.value = Math.max(0, e.translationY);
    })
    .onEnd((e) => {
      const shouldDismiss =
        e.translationY > trayHeight * 0.3 || e.velocityY > 600;
      if (shouldDismiss) {
        translateY.value = withSpring(trayHeight, SPRING);
        runOnJS(onClose)();
      } else {
        translateY.value = withSpring(0, SPRING);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const meta = feature ? FEATURE_META[feature.type] : null;

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        pointerEvents={isOpen ? "auto" : "none"}
        style={[
          styles.tray,
          { height: trayHeight, paddingBottom: bottomPad, backgroundColor: bg },
          animatedStyle,
        ]}
      >
        {/* Drag handle */}
        <View style={styles.handleRow}>
          <View style={[styles.handle, { backgroundColor: handleColor }]} />
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: dividerColor }]} />

        {feature && meta && (
          <View style={styles.content}>
            {/* Icon + type badge */}
            <View style={styles.header}>
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: meta.color + "22" },
                ]}
              >
                <Ionicons name={meta.icon} size={22} color={meta.color} />
              </View>
              <View style={styles.headerText}>
                <Text style={[styles.typeLabel, { color: meta.color }]}>
                  {meta.label}
                </Text>
                <Text
                  style={[styles.name, { color: textColor }]}
                  numberOfLines={2}
                >
                  {feature.name}
                </Text>
              </View>
            </View>

            {/* Details */}
            {feature.address && (
              <View style={styles.detailRow}>
                <Ionicons
                  name="location-outline"
                  size={15}
                  color={iconColor}
                  style={styles.detailIcon}
                />
                <Text style={[styles.detailText, { color: iconColor }]}>
                  {feature.address}
                </Text>
              </View>
            )}
            {feature.phone && (
              <View style={styles.detailRow}>
                <Ionicons
                  name="call-outline"
                  size={15}
                  color={iconColor}
                  style={styles.detailIcon}
                />
                <Text style={[styles.detailText, { color: iconColor }]}>
                  {feature.phone}
                </Text>
              </View>
            )}
            {feature.subarea && (
              <View style={styles.detailRow}>
                <Ionicons
                  name="grid-outline"
                  size={15}
                  color={iconColor}
                  style={styles.detailIcon}
                />
                <Text style={[styles.detailText, { color: iconColor }]}>
                  Subarea: {feature.subarea}
                </Text>
              </View>
            )}
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  tray: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 11,
  },
  handleRow: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 6,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    gap: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  typeLabel: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  detailIcon: {
    marginTop: 1,
  },
  detailText: {
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
});
