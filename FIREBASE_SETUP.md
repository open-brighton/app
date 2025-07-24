# Firebase Setup for Push Notifications

This guide will help you set up Firebase for push notifications to resolve the "FirebaseApp is not initialized" error.

## Current Status

✅ **Local notifications work** - The notification system is fully functional for local notifications
❌ **Push notifications need Firebase setup** - Remote push notifications require additional configuration

## Option 1: Use Local Notifications Only (Recommended for now)

If you only need local notifications (which work perfectly), you can ignore the Firebase error. The notification system will:

- ✅ Schedule immediate notifications
- ✅ Schedule delayed notifications
- ✅ Schedule notifications for specific dates
- ✅ Manage badge counts
- ✅ Handle notification permissions
- ✅ Work on both iOS and Android

The Firebase error only affects **remote push notifications** (notifications sent from a server).

## Option 2: Set Up Firebase for Push Notifications

If you need remote push notifications, follow these steps:

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "open-brighton")
4. Follow the setup wizard

### 2. Add Android App

1. In Firebase Console, click the Android icon
2. Enter package name: `org.openbrighton.app`
3. Download `google-services.json`
4. Place it in your project root

### 3. Add iOS App

1. In Firebase Console, click the iOS icon
2. Enter bundle ID: `org.openbrighton.app`
3. Download `GoogleService-Info.plist`
4. Place it in your project root

### 4. Install Firebase SDK

```bash
npx expo install @react-native-firebase/app
```

### 5. Update app.config.ts

```typescript
plugins: [
  // ... existing plugins
  [
    "expo-notifications",
    {
      icon: "./assets/images/notification-icon.png",
      color: "#ffffff",
      sounds: ["./assets/sounds/notification.wav"],
    },
  ],
  [
    "@react-native-firebase/app",
    {
      googleServicesFile: "./google-services.json",
    },
  ],
],
```

### 6. Build Development Build

```bash
eas build --profile development --platform all
```

## Testing Push Notifications

### Using Expo Push Service (Easier)

1. Get your Expo push token from the test component
2. Use the [Expo Push Tool](https://expo.dev/notifications) to send test notifications
3. Or use the Expo API:

```bash
curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/send" -d '{
  "to": "YOUR_EXPO_PUSH_TOKEN",
  "title":"Hello!",
  "body": "This is a test notification"
}'
```

### Using Firebase (More Complex)

1. Set up a server to send FCM messages
2. Use Firebase Admin SDK
3. Send to FCM token instead of Expo token

## Current Workaround

The notification system is designed to handle Firebase errors gracefully:

- ✅ Local notifications continue to work
- ✅ No app crashes
- ✅ Clear error messages in console
- ✅ Test component shows status

## Quick Test

1. Open the app
2. Go to Settings → Show Notification Test
3. Try "Send Immediate Notification"
4. You should see the notification appear immediately

This confirms that local notifications are working correctly.

## Next Steps

1. **For now**: Use local notifications (they work perfectly)
2. **Later**: Set up Firebase if you need remote push notifications
3. **Alternative**: Use Expo's push service instead of Firebase

## Troubleshooting

### If local notifications don't work:

1. Check device notification settings
2. Ensure app has notification permissions
3. Test on physical device (not simulator)
4. Check console for error messages

### If you want to disable push token requests:

Edit `lib/notifications.ts` and comment out the `getExpoPushToken()` call:

```typescript
// Comment out this line to disable push token requests
// await this.getExpoPushToken();
```

This will eliminate the Firebase error entirely while keeping local notifications working.
