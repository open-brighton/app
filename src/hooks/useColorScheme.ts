/**
 * Re-export from context so the whole app shares one color scheme state
 * and toggling (e.g. in Settings) updates the theme immediately everywhere.
 */
export { useColorScheme } from "@/contexts/ColorSchemeContext";
