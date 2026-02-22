import { useNotifications } from "@/hooks/useNotifications";
import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { ThemedButton } from "./ThemedButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

/**
 * Test component for demonstrating notification functionality
 * Shows various notification examples and status information
 */
export function NotificationTest() {
  const [lastNotificationId, setLastNotificationId] = useState<string | null>(
    null
  );
  const {
    isInitialized,
    isLoading,
    error,
    expoPushToken,
    scheduledNotifications,
    badgeCount,
    scheduleNotification,
    scheduleNotificationForDate,
    scheduleNotificationWithInterval,
    cancelNotification,
    cancelAllNotifications,
    updateBadgeCount,
    refreshScheduledNotifications,
    clearError,
  } = useNotifications();

  /**
   * Test immediate notification
   */
  const handleTestImmediateNotification = async () => {
    try {
      const notificationId = await scheduleNotification({
        title: "Test Notification",
        body: "This is a test notification sent immediately!",
        data: { screen: "index", type: "test" },
      });
      setLastNotificationId(notificationId);
      Alert.alert("Success", "Notification scheduled successfully!");
    } catch (err) {
      Alert.alert("Error", "Failed to schedule notification");
    }
  };

  /**
   * Test delayed notification (5 seconds)
   */
  const handleTestDelayedNotification = async () => {
    try {
      const notificationId = await scheduleNotificationWithInterval(
        {
          title: "Delayed Notification",
          body: "This notification was scheduled 5 seconds ago!",
          data: { screen: "settings", type: "delayed" },
        },
        5
      );
      setLastNotificationId(notificationId);
      Alert.alert("Success", "Delayed notification scheduled for 5 seconds!");
    } catch (err) {
      Alert.alert("Error", "Failed to schedule delayed notification");
    }
  };

  /**
   * Test scheduled notification for tomorrow
   */
  const handleTestScheduledNotification = async () => {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(10, 0, 0, 0); // 10 AM tomorrow

      const notificationId = await scheduleNotificationForDate(
        {
          title: "Scheduled Notification",
          body: "This notification was scheduled for tomorrow at 10 AM!",
          data: { screen: "index", type: "scheduled" },
        },
        tomorrow
      );
      setLastNotificationId(notificationId);
      Alert.alert("Success", "Notification scheduled for tomorrow at 10 AM!");
    } catch (err) {
      Alert.alert("Error", "Failed to schedule notification for tomorrow");
    }
  };

  /**
   * Cancel the last scheduled notification
   */
  const handleCancelLastNotification = async () => {
    if (!lastNotificationId) {
      Alert.alert("Info", "No notification to cancel");
      return;
    }

    try {
      await cancelNotification(lastNotificationId);
      setLastNotificationId(null);
      Alert.alert("Success", "Last notification cancelled!");
    } catch (err) {
      Alert.alert("Error", "Failed to cancel notification");
    }
  };

  /**
   * Cancel all scheduled notifications
   */
  const handleCancelAllNotifications = async () => {
    try {
      await cancelAllNotifications();
      setLastNotificationId(null);
      Alert.alert("Success", "All notifications cancelled!");
    } catch (err) {
      Alert.alert("Error", "Failed to cancel all notifications");
    }
  };

  /**
   * Test badge count
   */
  const handleTestBadgeCount = async () => {
    try {
      const newCount = badgeCount + 1;
      await updateBadgeCount(newCount);
      Alert.alert("Success", `Badge count updated to ${newCount}`);
    } catch (err) {
      Alert.alert("Error", "Failed to update badge count");
    }
  };

  /**
   * Refresh scheduled notifications list
   */
  const handleRefreshNotifications = async () => {
    try {
      await refreshScheduledNotifications();
      Alert.alert("Success", "Notifications list refreshed!");
    } catch (err) {
      Alert.alert("Error", "Failed to refresh notifications");
    }
  };

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Initializing Notifications...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.errorTitle}>
          Notification Error
        </ThemedText>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
        <ThemedButton
          onPress={clearError}
          style={styles.button}
          title="Clear Error"
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Notification Test
      </ThemedText>

      {/* Status Information */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Status
        </ThemedText>
        <ThemedView style={styles.statusItem}>
          <ThemedText type="defaultSemiBold">Initialized:</ThemedText>
          <ThemedText>{isInitialized ? "Yes" : "No"}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statusItem}>
          <ThemedText type="defaultSemiBold">Badge Count:</ThemedText>
          <ThemedText>{badgeCount}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statusItem}>
          <ThemedText type="defaultSemiBold">Scheduled:</ThemedText>
          <ThemedText>{scheduledNotifications.length}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statusItem}>
          <ThemedText type="defaultSemiBold">Push Token:</ThemedText>
          <ThemedText style={styles.tokenText}>
            {expoPushToken
              ? `${expoPushToken.substring(0, 20)}...`
              : "Not available (Firebase not configured)"}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Test Actions */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Test Actions
        </ThemedText>

        <ThemedButton
          onPress={handleTestImmediateNotification}
          style={styles.button}
          title="Send Immediate Notification"
        />

        <ThemedButton
          onPress={handleTestDelayedNotification}
          style={styles.button}
          title="Send Delayed Notification (5s)"
        />

        <ThemedButton
          onPress={handleTestScheduledNotification}
          style={styles.button}
          title="Schedule for Tomorrow (10 AM)"
        />

        <ThemedButton
          onPress={handleTestBadgeCount}
          style={styles.button}
          title="Increment Badge Count"
        />
      </ThemedView>

      {/* Management Actions */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Management
        </ThemedText>

        <ThemedButton
          onPress={handleRefreshNotifications}
          style={styles.button}
          title="Refresh Notifications"
        />

        <ThemedButton
          onPress={handleCancelLastNotification}
          style={styles.button}
          title="Cancel Last Notification"
        />

        <ThemedButton
          onPress={handleCancelAllNotifications}
          style={styles.button}
          title="Cancel All Notifications"
        />
      </ThemedView>

      {/* Scheduled Notifications List */}
      {scheduledNotifications.length > 0 && (
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Scheduled Notifications ({scheduledNotifications.length})
          </ThemedText>
          {scheduledNotifications.map((notification, index) => (
            <ThemedView
              key={notification.identifier}
              style={styles.notificationItem}
            >
              <ThemedText type="defaultSemiBold">
                {notification.content.title}
              </ThemedText>
              <ThemedText style={styles.notificationBody}>
                {notification.content.body}
              </ThemedText>
              <ThemedText style={styles.notificationId}>
                ID: {notification.identifier}
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  statusItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    marginBottom: 8,
  },
  button: {
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  errorTitle: {
    color: "#ff6b6b",
    marginBottom: 10,
  },
  errorText: {
    color: "#ff6b6b",
    marginBottom: 15,
  },
  tokenText: {
    fontSize: 12,
    fontFamily: "monospace",
  },
  notificationItem: {
    padding: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    marginBottom: 8,
  },
  notificationBody: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.8,
  },
  notificationId: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.6,
    fontFamily: "monospace",
  },
});
