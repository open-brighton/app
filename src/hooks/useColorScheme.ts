import { Appearance, ColorSchemeName, useColorScheme as useRNColorScheme } from 'react-native';

export const useColorScheme = () => {
  const colorScheme = useRNColorScheme();
  const setColorScheme = (scheme: ColorSchemeName) => {
    Appearance.setColorScheme(scheme);
  };
  return { colorScheme, setColorScheme };
};
