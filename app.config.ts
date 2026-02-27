import { ConfigContext, ExpoConfig } from 'expo/config';

const APP_ENV = process.env.APP_ENV ?? 'development';
const IS_DEV = APP_ENV === 'development';
const IS_PREVIEW = APP_ENV === 'preview';
const IS_PROD = APP_ENV === 'production';

const appName = IS_PROD ? 'Open Brighton' : IS_PREVIEW ? 'Open Brighton Preview' : 'Open Brighton Dev';
const bundleId = IS_PROD ? 'org.openbrighton.app' : IS_PREVIEW ? 'org.openbrighton.app.preview' : 'org.openbrighton.app.dev';
const scheme = IS_PROD ? 'open-brighton' : IS_PREVIEW ? 'open-brighton-preview' : 'open-brighton-dev';
const icon = IS_DEV ? './src/assets/images/icon-dev.png' : './src/assets/images/icon.png';
const androidBackgroundColor = IS_DEV ? '#f5f0e0' : '#0b235a';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: appName,
  slug: "open-brighton",
  version: "1.0.0",
  orientation: "portrait",
  icon,
  scheme,
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
    bundleIdentifier: bundleId,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: icon,
      backgroundImage: icon,
      backgroundColor: androidBackgroundColor,
    },
    package: bundleId,
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
        merchantIdentifier: `merchant.${bundleId}`,
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