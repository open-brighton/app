import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Types for notification data
export interface NotificationData {
  title: string;
  body: string;
  data?: Record<string, any>;
  sound?: boolean;
  badge?: number;
}

export interface NotificationChannel {
  id: string;
  name: string;
  description?: string;
  importance?: Notifications.AndroidImportance;
  vibrationPattern?: number[];
  lightColor?: string;
}

// Configure how notifications are handled when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,    // Show notification banner
    shouldShowList: true,       // Show in notification list
    shouldPlaySound: true,      // Play notification sound
    shouldSetBadge: true,       // Update app badge count
  }),
});

/**
 * Request notification permissions from the user
 */
export const requestPermissions = async (): Promise<void> => {
  if (!Device.isDevice) {
    console.warn('Push notifications require a physical device');
    return;
  }

  // Check existing permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // Request permissions if not already granted
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.warn('Notification permissions not granted - local notifications may not work');
    return;
  }

  // Get Expo push token (this may fail if Firebase isn't configured, but that's okay)
  await getExpoPushToken();
};

/**
 * Get Expo push token for sending push notifications
 */
export const getExpoPushToken = async (): Promise<string | null> => {
  try {
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? 
                     Constants?.easConfig?.projectId;
    
    if (!projectId) {
      console.warn('Project ID not found in app configuration - push notifications may not work');
      return null;
    }

    const token = await Notifications.getExpoPushTokenAsync({
      projectId,
    });

    console.log('Expo push token:', token.data);
    return token.data;
  } catch (error) {
    // Handle Firebase initialization error gracefully
    if (error instanceof Error && error.message.includes('FirebaseApp')) {
      console.warn('Firebase not configured for push notifications. Local notifications will still work.');
      console.warn('To enable push notifications, follow: https://docs.expo.dev/push-notifications/fcm-credentials/');
      return null;
    }
    
    console.error('Failed to get Expo push token:', error);
    return null;
  }
};

/**
 * Set up Android notification channels
 */
export const setupNotificationChannels = async (): Promise<void> => {
  if (Platform.OS !== 'android') return;

  // Create default notification channel
  await Notifications.setNotificationChannelAsync('default', {
    name: 'Default',
    importance: Notifications.AndroidImportance.DEFAULT,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });

  // Create high priority channel for important notifications
  await Notifications.setNotificationChannelAsync('high-priority', {
    name: 'High Priority',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });
};

/**
 * Set up notification event listeners
 */
export const setupListeners = async (): Promise<void> => {
  // Listen for notifications received while app is running
  Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log('Notification received:', notification);
      // Handle notification received event
      handleNotificationReceived(notification);
    }
  );

  // Listen for user interaction with notifications
  Notifications.addNotificationResponseReceivedListener(
    (response) => {
      console.log('Notification response:', response);
      // Handle notification response event
      handleNotificationResponse(response);
    }
  );
};

/**
 * Handle notification received event
 */
export const handleNotificationReceived = (notification: Notifications.Notification): void => {
  // You can add custom logic here, such as:
  // - Updating app state
  // - Showing in-app alerts
  // - Logging analytics
  console.log('Handling received notification:', notification.request.content);
};

/**
 * Handle notification response event (user tapped notification)
 */
export const handleNotificationResponse = (response: Notifications.NotificationResponse): void => {
  const { data } = response.notification.request.content;
  
  // Handle deep linking or navigation based on notification data
  if (data?.screen) {
    // Navigate to specific screen
    console.log('Navigating to screen:', data.screen);
  }
};

/**
 * Schedule a local notification
 */
export const scheduleNotification = async (
  notificationData: NotificationData,
  trigger?: Notifications.NotificationTriggerInput
): Promise<string> => {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: notificationData.title,
        body: notificationData.body,
        data: notificationData.data || {},
        sound: notificationData.sound ?? true,
        badge: notificationData.badge,
      },
      trigger: trigger || null, // null means show immediately
    });

    console.log('Notification scheduled with ID:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('Failed to schedule notification:', error);
    throw error;
  }
};

/**
 * Schedule a notification for a specific date/time
 */
export const scheduleNotificationForDate = async (
  notificationData: NotificationData,
  date: Date
): Promise<string> => {
  return scheduleNotification(notificationData, {
    type: Notifications.SchedulableTriggerInputTypes.DATE,
    date,
  });
};

/**
 * Schedule a notification with a time interval
 */
export const scheduleNotificationWithInterval = async (
  notificationData: NotificationData,
  seconds: number
): Promise<string> => {
  return scheduleNotification(notificationData, {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds,
  });
};

/**
 * Cancel a specific scheduled notification
 */
export const cancelNotification = async (notificationId: string): Promise<void> => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log('Notification cancelled:', notificationId);
  } catch (error) {
    console.error('Failed to cancel notification:', error);
    throw error;
  }
};

/**
 * Cancel all scheduled notifications
 */
export const cancelAllNotifications = async (): Promise<void> => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('All notifications cancelled');
  } catch (error) {
    console.error('Failed to cancel all notifications:', error);
    throw error;
  }
};

/**
 * Get all scheduled notifications
 */
export const getScheduledNotifications = async (): Promise<Notifications.NotificationRequest[]> => {
  try {
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Failed to get scheduled notifications:', error);
    throw error;
  }
};

/**
 * Get the current Expo push token
 */
export const getExpoPushTokenValue = (): string | null => {
  // This function is no longer part of a class, so it doesn't have a direct instance variable.
  // It would require a global state or a different approach to manage the token.
  // For now, returning null as a placeholder.
  console.warn('getExpoPushTokenValue is no longer part of a class and cannot return a token directly.');
  return null;
};

/**
 * Set the app badge count
 */
export const setBadgeCount = async (count: number): Promise<void> => {
  try {
    await Notifications.setBadgeCountAsync(count);
  } catch (error) {
    console.error('Failed to set badge count:', error);
    throw error;
  }
};

/**
 * Get the current app badge count
 */
export const getBadgeCount = async (): Promise<number> => {
  try {
    return await Notifications.getBadgeCountAsync();
  } catch (error) {
    console.error('Failed to get badge count:', error);
    throw error;
  }
};

/**
 * Clean up listeners when the service is no longer needed
 */
export const cleanup = (): void => {
  // This function is no longer part of a class, so it doesn't have direct listeners to remove.
  // It would require a global state or a different approach to manage listeners.
  console.warn('cleanup is no longer part of a class and cannot remove listeners directly.');
};

/**
 * Initialize notification permissions, channels, and listeners
 */
export const initialize = async (): Promise<void> => {
  await requestPermissions();
  await setupNotificationChannels();
  await setupListeners();
};

/** Object compatible with useNotifications hook (wraps exported functions) */
export const notificationService = {
  initialize,
  getExpoPushTokenValue,
  getScheduledNotifications,
  scheduleNotification,
  scheduleNotificationForDate,
  scheduleNotificationWithInterval,
  cancelNotification,
  cancelAllNotifications,
  setBadgeCount,
  getBadgeCount,
  cleanup,
}; 