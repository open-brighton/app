import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Appearance, ColorSchemeName, useColorScheme as useRNColorScheme } from 'react-native';

const COLOR_SCHEME_STORAGE_KEY = '@openbrighton/color_scheme';

/**
 * Internal hook that holds the actual color scheme state. Only used by ColorSchemeProvider.
 * Use useColorScheme() from context in components so the whole app updates when theme changes.
 */
export function useColorSchemeState() {
  const systemScheme = useRNColorScheme();
  const [preferredScheme, setPreferredScheme] = useState<ColorSchemeName | null>(null);

  useEffect(() => {
    const loadStoredScheme = async () => {
      try {
        const stored = await AsyncStorage.getItem(COLOR_SCHEME_STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') {
          setPreferredScheme(stored);
          Appearance.setColorScheme(stored);
        }
      } catch {
        // Ignore read errors; fall back to system
      }
    };
    loadStoredScheme();
  }, []);

  const colorScheme = preferredScheme ?? systemScheme ?? 'light';

  const setColorScheme = (scheme: ColorSchemeName) => {
    setPreferredScheme(scheme);
    Appearance.setColorScheme(scheme);
    AsyncStorage.setItem(COLOR_SCHEME_STORAGE_KEY, scheme).catch(() => {
      // Ignore write errors
    });
  };

  return { colorScheme, setColorScheme };
}
