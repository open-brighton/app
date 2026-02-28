import { Colors } from "@/constants/Colors";
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
import { StyleSheet, Switch, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type MapLayerId = string;

export type MapLayer = {
  id: MapLayerId;
  label: string;
  description?: string;
  icon: keyof typeof Ionicons.glyphMap;
  enabled: boolean;
};

type MapLayerTrayProps = {
  isOpen: boolean;
  layers: MapLayer[];
  onLayerToggle: (id: MapLayerId, enabled: boolean) => void;
  onClose: () => void;
};

const HANDLE_HEIGHT = 28;
const DIVIDER_HEIGHT = 1;
const ROW_HEIGHT = 64;
const BOTTOM_PADDING = 16;

const SPRING = { damping: 22, stiffness: 280, mass: 0.9 } as const;

export function MapLayerTray({
  isOpen,
  layers,
  onLayerToggle,
  onClose,
}: MapLayerTrayProps) {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const bg = isDark ? Colors.dark.background : Colors.light.background;
  const textColor = isDark ? Colors.dark.text : Colors.light.text;
  const iconColor = isDark ? Colors.dark.icon : Colors.light.icon;
  const dividerColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const handleColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";

  const bottomPad = Math.max(insets.bottom, BOTTOM_PADDING);
  const trayHeight =
    HANDLE_HEIGHT + DIVIDER_HEIGHT + layers.length * ROW_HEIGHT + bottomPad;

  // translateY: 0 = fully visible, trayHeight = hidden below screen
  const translateY = useSharedValue(trayHeight);

  useEffect(() => {
    translateY.value = withSpring(isOpen ? 0 : trayHeight, SPRING);
  }, [isOpen, trayHeight, translateY]);

  const panGesture = Gesture.Pan()
    .activeOffsetY(8)
    .onUpdate((e) => {
      // Only allow dragging downward
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

        {/* Layer rows */}
        {layers.map((layer, index) => (
          <View key={layer.id}>
            <View style={styles.layerRow}>
              <View style={styles.layerInfo}>
                <View
                  style={[
                    styles.layerIconWrap,
                    {
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.07)"
                        : "rgba(0,0,0,0.05)",
                    },
                  ]}
                >
                  <Ionicons name={layer.icon} size={18} color={iconColor} />
                </View>
                <View style={styles.layerText}>
                  <Text style={[styles.layerLabel, { color: textColor }]}>
                    {layer.label}
                  </Text>
                  {layer.description && (
                    <Text style={[styles.layerDesc, { color: iconColor }]}>
                      {layer.description}
                    </Text>
                  )}
                </View>
              </View>
              <Switch
                value={layer.enabled}
                onValueChange={(val) => onLayerToggle(layer.id, val)}
                trackColor={{
                  false: isDark ? "#444" : "#ddd",
                  true: Colors.light.primary,
                }}
                thumbColor={layer.enabled ? "#fff" : isDark ? "#888" : "#fff"}
              />
            </View>
            {index < layers.length - 1 && (
              <View
                style={[styles.rowDivider, { backgroundColor: dividerColor }]}
              />
            )}
          </View>
        ))}
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
    elevation: 10,
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
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 68,
    marginRight: 20,
  },
  layerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: ROW_HEIGHT,
  },
  layerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  layerIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  layerText: {
    flex: 1,
  },
  layerLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  layerDesc: {
    fontSize: 12,
    marginTop: 1,
  },
});
