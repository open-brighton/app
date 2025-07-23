import { NotificationData, notificationService } from '@/lib/notifications';
import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useState } from 'react';

/**
 * React hook for managing notifications
 * Provides easy access to notification functionality with state management
 */
export function useNotifications() {
  // State for tracking notification service status
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [scheduledNotifications, setScheduledNotifications] = useState<Notifications.NotificationRequest[]>([]);
  const [badgeCount, setBadgeCount] = useState<number>(0);

  /**
   * Initialize the notification service
   */
  const initialize = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await notificationService.initialize();
      setIsInitialized(true);
      
      // Get initial data
      const token = notificationService.getExpoPushTokenValue();
      setExpoPushToken(token);
      
      const notifications = await notificationService.getScheduledNotifications();
      setScheduledNotifications(notifications);
      
      const badge = await notificationService.getBadgeCount();
      setBadgeCount(badge);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize notifications');
      console.error('Notification initialization error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Schedule a notification immediately
   */
  const scheduleNotification = useCallback(async (
    notificationData: NotificationData
  ): Promise<string> => {
    try {
      const notificationId = await notificationService.scheduleNotification(notificationData);
      
      // Refresh scheduled notifications list
      const notifications = await notificationService.getScheduledNotifications();
      setScheduledNotifications(notifications);
      
      return notificationId;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to schedule notification';
      setError(errorMessage);
      throw err;
    }
  }, []);

  /**
   * Schedule a notification for a specific date/time
   */
  const scheduleNotificationForDate = useCallback(async (
    notificationData: NotificationData,
    date: Date
  ): Promise<string> => {
    try {
      const notificationId = await notificationService.scheduleNotificationForDate(notificationData, date);
      
      // Refresh scheduled notifications list
      const notifications = await notificationService.getScheduledNotifications();
      setScheduledNotifications(notifications);
      
      return notificationId;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to schedule notification for date';
      setError(errorMessage);
      throw err;
    }
  }, []);

  /**
   * Schedule a notification with a time interval
   */
  const scheduleNotificationWithInterval = useCallback(async (
    notificationData: NotificationData,
    seconds: number
  ): Promise<string> => {
    try {
      const notificationId = await notificationService.scheduleNotificationWithInterval(notificationData, seconds);
      
      // Refresh scheduled notifications list
      const notifications = await notificationService.getScheduledNotifications();
      setScheduledNotifications(notifications);
      
      return notificationId;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to schedule notification with interval';
      setError(errorMessage);
      throw err;
    }
  }, []);

  /**
   * Cancel a specific notification
   */
  const cancelNotification = useCallback(async (notificationId: string): Promise<void> => {
    try {
      await notificationService.cancelNotification(notificationId);
      
      // Refresh scheduled notifications list
      const notifications = await notificationService.getScheduledNotifications();
      setScheduledNotifications(notifications);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cancel notification';
      setError(errorMessage);
      throw err;
    }
  }, []);

  /**
   * Cancel all scheduled notifications
   */
  const cancelAllNotifications = useCallback(async (): Promise<void> => {
    try {
      await notificationService.cancelAllNotifications();
      setScheduledNotifications([]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cancel all notifications';
      setError(errorMessage);
      throw err;
    }
  }, []);

  /**
   * Set the app badge count
   */
  const updateBadgeCount = useCallback(async (count: number): Promise<void> => {
    try {
      await notificationService.setBadgeCount(count);
      setBadgeCount(count);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to set badge count';
      setError(errorMessage);
      throw err;
    }
  }, []);

  /**
   * Refresh scheduled notifications list
   */
  const refreshScheduledNotifications = useCallback(async (): Promise<void> => {
    try {
      const notifications = await notificationService.getScheduledNotifications();
      setScheduledNotifications(notifications);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh notifications';
      setError(errorMessage);
    }
  }, []);

  /**
   * Clear any error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Initialize notifications on mount
   */
  useEffect(() => {
    initialize();
    
    // Cleanup on unmount
    return () => {
      notificationService.cleanup();
    };
  }, [initialize]);

  return {
    // State
    isInitialized,
    isLoading,
    error,
    expoPushToken,
    scheduledNotifications,
    badgeCount,
    
    // Actions
    initialize,
    scheduleNotification,
    scheduleNotificationForDate,
    scheduleNotificationWithInterval,
    cancelNotification,
    cancelAllNotifications,
    updateBadgeCount,
    refreshScheduledNotifications,
    clearError,
  };
} 