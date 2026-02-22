import type { ComponentType } from "react";
import { StyleSheet, View } from "react-native";

import type { NuxStepScreenProps } from "@/constants/nux";
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
};

function WelcomeStepScreen(_props: NuxStepScreenProps) {
  return (
    <View style={styles.content}>
      <HomeParallaxContent extraPaddingBottom={80} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
