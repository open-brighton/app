import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  layers: MapLayer[];
  onLayerToggle: (id: MapLayerId, enabled: boolean) => void;
};

const COLLAPSED_HEIGHT = 68;
const EXPANDED_HEIGHT = 320;

export function MapLayerTray({ layers, onLayerToggle }: MapLayerTrayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(COLLAPSED_HEIGHT)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const bg = isDark ? Colors.dark.background : Colors.light.background;
  const textColor = isDark ? Colors.dark.text : Colors.light.text;
  const iconColor = isDark ? Colors.dark.icon : Colors.light.icon;
  const dividerColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const handleColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";

  const activeCount = layers.filter((l) => l.enabled).length;

  const toggle = () => {
    const expanding = !isExpanded;
    setIsExpanded(expanding);

    Animated.parallel([
      Animated.spring(animatedHeight, {
        toValue: expanding
          ? Math.min(EXPANDED_HEIGHT, COLLAPSED_HEIGHT + layers.length * 72 + 56)
          : COLLAPSED_HEIGHT,
        useNativeDriver: false,
        tension: 65,
        friction: 11,
      }),
      Animated.timing(contentOpacity, {
        toValue: expanding ? 1 : 0,
        duration: expanding ? 200 : 100,
        useNativeDriver: false,
        delay: expanding ? 80 : 0,
      }),
    ]).start();
  };

  const paddingBottom = Math.max(insets.bottom, 12);

  return (
    <Animated.View
      style={[
        styles.tray,
        {
          height: animatedHeight,
          paddingBottom,
          backgroundColor: bg,
        },
      ]}
    >
      {/* Drag handle */}
      <View style={styles.handleRow}>
        <View style={[styles.handle, { backgroundColor: handleColor }]} />
      </View>

      {/* Header — always visible, taps to toggle */}
      <TouchableOpacity
        onPress={toggle}
        style={styles.header}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8 }}
      >
        <View style={styles.headerLeft}>
          <Ionicons
            name="layers-outline"
            size={20}
            color={iconColor}
            style={styles.headerIcon}
          />
          <Text style={[styles.headerTitle, { color: textColor }]}>Layers</Text>
          {activeCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{activeCount}</Text>
            </View>
          )}
        </View>
        <Ionicons
          name={isExpanded ? "chevron-down" : "chevron-up"}
          size={18}
          color={iconColor}
        />
      </TouchableOpacity>

      {/* Layer rows — fade in when expanded */}
      <Animated.View style={[styles.layerList, { opacity: contentOpacity }]}>
        <View style={[styles.divider, { backgroundColor: dividerColor }]} />
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
    </Animated.View>
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
    overflow: "hidden",
  },
  handleRow: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 2,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerIcon: {
    marginRight: 2,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  badge: {
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  layerList: {
    flex: 1,
    overflow: "hidden",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 0,
  },
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 64,
    marginRight: 20,
  },
  layerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
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
