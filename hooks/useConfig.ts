import Constants from "expo-constants";

export interface AppConfig {
  environment: string;
  appVersion: string;
  buildNumber?: string;
  bundleIdentifier?: string;
}

export function useConfig(): AppConfig {
  const environment = process.env.EXPO_PUBLIC_NODE_ENV || "development";
  const appVersion = Constants.expoConfig?.version || "1.0.0";
  const buildNumber = Constants.expoConfig?.ios?.buildNumber || Constants.expoConfig?.android?.versionCode?.toString();
  const bundleIdentifier = Constants.expoConfig?.ios?.bundleIdentifier || Constants.expoConfig?.android?.package;

  return {
    environment,
    appVersion,
    buildNumber,
    bundleIdentifier,
  };
} 