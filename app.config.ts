import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Open Brighton",
  slug: "open-brighton",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  scheme: "open-brighton",
  userInterfaceStyle: "automatic",
  updates: {
    url: "https://u.expo.dev/3bfca4f2-0862-442e-b394-574160d0a998",
    enableBsdiffPatchSupport: true,
  },
  splash: {
    image: "./src/assets/images/splash-icon.png",
    imageWidth: 200,
    resizeMode: "contain",
    backgroundColor: "#0b235a",
  },
  ios: {
    supportsTablet: true, 
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    bundleIdentifier: "org.openbrighton.app",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/icon.png",
      backgroundImage: "./src/assets/images/icon.png",
      backgroundColor: "#0b235a",
    },
    package: "org.openbrighton.app",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./src/assets/images/favicon.png",
    backgroundColor: "#0b235a",
  },
  plugins: [
    "./plugins/withAndroidLaunchModeSingleTask.js",
    "expo-font",
    "expo-image",
    "expo-web-browser",
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./src/assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#0b235a",
      },
    ],
    [
      "expo-dev-client",
      {
        launchMode: "most-recent",
      },
    ],
    [
      "@rnmapbox/maps",
      {
        RNMAPBOX_MAPS_DOWNLOAD_TOKEN: process.env.MAPBOX_DOWNLOAD_TOKEN,
        RNMapboxMapsVersion: "11.16.2",
      },
    ],
    [
      "expo-location",
      {
        locationWhenInUsePermission: "Show current location on map.",
      },
    ],
    [
        "expo-notifications",
    ],
    [
      "@stripe/stripe-react-native",
      {
        merchantIdentifier: "merchant.org.openbrighton.app",
        enableGooglePay: false,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "3bfca4f2-0862-442e-b394-574160d0a998",
    },
    // Mapbox public token – set EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN in EAS Secrets or .env
    MAPBOX_ACCESS_TOKEN: process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN,
  },
  owner: "jcuffney",
}); 