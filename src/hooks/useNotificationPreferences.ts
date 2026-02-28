import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const STORAGE_KEY = '@openbrighton/notification_preferences';

export type NotificationType = 'community_events' | 'announcements' | 'news' | 'alerts';

export interface NotificationTypeConfig {
  key: NotificationType;
  label: string;
  description: string;
}

export const NOTIFICATION_TYPES: NotificationTypeConfig[] = [
  { key: 'community_events', label: 'Community Events', description: 'Local events and gatherings' },
  { key: 'announcements',    label: 'Announcements',    description: 'Official town announcements' },
  { key: 'news',             label: 'News',             description: 'Local news and stories' },
  { key: 'alerts',           label: 'Alerts',           description: 'Urgent alerts and safety notices' },
];

type NotificationTypePreferences = Record<NotificationType, boolean>;

const DEFAULT_TYPE_PREFS: NotificationTypePreferences = {
  community_events: true,
  announcements:    true,
  news:             true,
  alerts:           true,
};

interface StoredPreferences {
  enabled: boolean;
  types: NotificationTypePreferences;
}

export function useNotificationPreferences() {
  const [enabled, setEnabledState] = useState(false);
  const [typePrefs, setTypePrefsState] = useState<NotificationTypePreferences>(DEFAULT_TYPE_PREFS);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const stored: StoredPreferences = JSON.parse(raw);
          setEnabledState(stored.enabled ?? false);
          setTypePrefsState({ ...DEFAULT_TYPE_PREFS, ...(stored.types ?? {}) });
        }
      } catch {
        // Fall back to defaults on read error
      }
    };
    load();
  }, []);

  const persist = (next: StoredPreferences) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
  };

  const setEnabled = (value: boolean) => {
    setEnabledState(value);
    persist({ enabled: value, types: typePrefs });
  };

  const setTypeEnabled = (type: NotificationType, value: boolean) => {
    const next = { ...typePrefs, [type]: value };
    setTypePrefsState(next);
    persist({ enabled, types: next });
  };

  return { enabled, setEnabled, typePrefs, setTypeEnabled };
}
