import Constants from "expo-constants";

export const config = {
  ENVIRONMENT: process.env.EXPO_PUBLIC_NODE_ENV || "development",
  API_HOST: process.env.EXPO_PUBLIC_API_HOST || "https://api.openbrighton.com",
  MAPBOX_ACCESS_TOKEN: process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN,
  APP_VERSION: Constants.expoConfig?.version || "1.0.0",
  BUILD_NUMBER: Constants.expoConfig?.ios?.buildNumber || Constants.expoConfig?.android?.versionCode?.toString(),
  BUNDLE_IDENTIFIER: Constants.expoConfig?.ios?.bundleIdentifier || Constants.expoConfig?.android?.package,
};

export default config;