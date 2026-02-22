import { useEffect, useState } from 'react';
import { ColorSchemeName, useColorScheme as useRNColorScheme } from 'react-native';

const COLOR_SCHEME_STORAGE_KEY = '@openbrighton/color_scheme';

/**
 * Web: internal hook for color scheme state. Only used by ColorSchemeProvider.
 * To support static rendering, hydration is handled on the client.
 */
export function useColorSchemeState() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [preferredScheme, setPreferredScheme] = useState<ColorSchemeName | null>(null);
  const systemScheme = useRNColorScheme();

  useEffect(() => {
    setHasHydrated(true);
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(COLOR_SCHEME_STORAGE_KEY) : null;
    if (stored === 'light' || stored === 'dark') {
      setPreferredScheme(stored);
    }
  }, []);

  const colorScheme = (hasHydrated ? (preferredScheme ?? systemScheme ?? 'light') : 'light') as ColorSchemeName;

  const setColorScheme = (scheme: ColorSchemeName) => {
    setPreferredScheme(scheme);
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, scheme);
      } catch {
        // Ignore write errors
      }
    }
  };

  return { colorScheme, setColorScheme };
}
