/**
 * Re-export from context so the whole app shares one color scheme state.
 * useColorSchemeState.web.ts provides the web-specific storage (localStorage).
 */
export { useColorScheme } from "@/contexts/ColorSchemeContext";
