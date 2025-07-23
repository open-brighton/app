# Notifications System

This document describes the modular notification system implemented using `expo-notifications` for the Open Brighton app.

## Overview

The notification system is built with a modular architecture that provides:

- **Service Layer**: Core notification functionality (`lib/notifications.ts`)
- **React Hook**: Easy state management (`hooks/useNotifications.ts`)
- **Test Component**: UI for testing notifications (`components/NotificationTest.tsx`)

## Architecture

### 1. Notification Service (`lib/notifications.ts`)

The core service class that handles all notification operations:

```typescript
import { notificationService } from "@/lib/notifications";

// Initialize the service
await notificationService.initialize();

// Schedule a notification
const notificationId = await notificationService.scheduleNotification({
  title: "Hello",
  body: "This is a test notification",
  data: { screen: "explore" },
});
```

**Key Features:**

- Singleton pattern for consistent state
- Automatic permission handling
- Android notification channels setup
- Push token management
- Event listeners for notification interactions
- Error handling and logging

### 2. React Hook (`hooks/useNotifications.ts`)

A React hook that provides easy access to notification functionality:

```typescript
import { useNotifications } from "@/hooks/useNotifications";

function MyComponent() {
  const {
    isInitialized,
    isLoading,
    error,
    expoPushToken,
    scheduledNotifications,
    scheduleNotification,
    cancelNotification,
    // ... other methods
  } = useNotifications();

  // Use the notification functions
}
```

**Features:**

- Automatic initialization on mount
- State management for all notification data
- Error handling and recovery
- Cleanup on unmount

### 3. Test Component (`components/NotificationTest.tsx`)

A comprehensive test interface that demonstrates all notification features:

- Immediate notifications
- Delayed notifications (time intervals)
- Scheduled notifications (specific dates)
- Badge count management
- Notification cancellation
- Status monitoring

## Usage Examples

### Basic Notification

```typescript
import { useNotifications } from "@/hooks/useNotifications";

function MyComponent() {
  const { scheduleNotification } = useNotifications();

  const sendNotification = async () => {
    try {
      await scheduleNotification({
        title: "Welcome!",
        body: "Thanks for using Open Brighton",
        data: { screen: "explore" },
      });
    } catch (error) {
      console.error("Failed to send notification:", error);
    }
  };
}
```

### Scheduled Notification

```typescript
const { scheduleNotificationForDate } = useNotifications();

const scheduleReminder = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0); // 10 AM tomorrow

  await scheduleNotificationForDate(
    {
      title: "Daily Reminder",
      body: "Don't forget to explore Brighton!",
      data: { screen: "explore" },
    },
    tomorrow
  );
};
```

### Delayed Notification

```typescript
const { scheduleNotificationWithInterval } = useNotifications();

const sendDelayedNotification = async () => {
  await scheduleNotificationWithInterval(
    {
      title: "Check this out!",
      body: "Something interesting happened 5 seconds ago",
      data: { screen: "settings" },
    },
    5
  ); // 5 seconds delay
};
```

## Configuration

### Environment Variables

The system uses environment variables for secure token management:

```env
# Mapbox tokens (already configured)
EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token_here
MAPBOX_DOWNLOAD_TOKEN=your_download_token_here

# Add these for push notifications (if needed)
EXPO_PUBLIC_PUSH_SERVER_URL=your_push_server_url
```

### App Configuration

The notification system is configured in `app.config.ts`:

```typescript
plugins: [
  [
    "@rnmapbox/maps",
    {
      RNMapboxMapsDownloadToken: process.env.MAPBOX_DOWNLOAD_TOKEN,
      RNMapboxMapsVersion: "11.0.0",
    },
  ],
  [
    "expo-location",
    {
      locationWhenInUsePermission: "Show current location on map.",
    },
  ],
  // Add expo-notifications plugin if needed for push notifications
];
```

## Testing

### Using the Test Component

1. Navigate to Settings in the app
2. Tap "Show Notification Test"
3. Use the various test buttons to try different notification types

### Manual Testing

```typescript
// Test immediate notification
await scheduleNotification({
  title: "Test",
  body: "This is a test",
});

// Test delayed notification
await scheduleNotificationWithInterval(
  {
    title: "Delayed Test",
    body: "This will appear in 5 seconds",
  },
  5
);

// Test scheduled notification
const futureDate = new Date();
futureDate.setMinutes(futureDate.getMinutes() + 1);
await scheduleNotificationForDate(
  {
    title: "Scheduled Test",
    body: "This will appear in 1 minute",
  },
  futureDate
);
```

## Features

### ✅ Implemented

- [x] Local notifications (immediate, delayed, scheduled)
- [x] Notification permissions handling
- [x] Android notification channels
- [x] Badge count management
- [x] Notification cancellation
- [x] Error handling and logging
- [x] React hook for easy integration
- [x] Test component for debugging
- [x] TypeScript support
- [x] Modular architecture

### 🔄 Future Enhancements

- [ ] Push notifications (remote)
- [ ] Notification categories
- [ ] Custom notification sounds
- [ ] Rich notifications (images, actions)
- [ ] Notification history
- [ ] Background notification handling

## Troubleshooting

### Common Issues

1. **"Must use physical device for Push Notifications"**

   - Push notifications don't work on simulators/emulators
   - Use a physical device for testing

2. **Permission denied**

   - Check device notification settings
   - Ensure app has notification permissions

3. **Notifications not appearing**
   - Check notification handler configuration
   - Verify notification channels (Android)
   - Check device Do Not Disturb settings

### Debug Tips

- Use the test component to verify functionality
- Check console logs for error messages
- Verify environment variables are set correctly
- Test on physical devices only

## API Reference

### NotificationService Methods

- `initialize()`: Set up permissions and listeners
- `scheduleNotification(data, trigger?)`: Schedule a notification
- `scheduleNotificationForDate(data, date)`: Schedule for specific date
- `scheduleNotificationWithInterval(data, seconds)`: Schedule with delay
- `cancelNotification(id)`: Cancel specific notification
- `cancelAllNotifications()`: Cancel all notifications
- `getScheduledNotifications()`: Get all scheduled notifications
- `setBadgeCount(count)`: Set app badge count
- `getBadgeCount()`: Get current badge count
- `cleanup()`: Remove event listeners

### useNotifications Hook

- `isInitialized`: Service initialization status
- `isLoading`: Loading state
- `error`: Error message if any
- `expoPushToken`: Push token for remote notifications
- `scheduledNotifications`: List of scheduled notifications
- `badgeCount`: Current badge count
- All service methods are available as hook methods

## Security Notes

- Environment variables are used for sensitive configuration
- Push tokens should be handled securely
- Never log sensitive tokens in production
- Implement proper error handling for production use

## References

- [Expo Notifications Documentation](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [React Native Push Notifications](https://reactnative.dev/docs/pushnotificationios)
- [Android Notification Channels](https://developer.android.com/guide/topics/ui/notifiers/notifications#ManageChannels)
