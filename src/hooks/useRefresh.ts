import { useCallback, useState } from "react";

/**
 * Shared pull-to-refresh state. Pass an async `onRefresh` callback to run
 * real fetch logic; omit it for placeholder screens (fakes a 1-second delay).
 */
export function useRefresh(onRefresh?: () => Promise<void>) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (onRefresh) {
        await onRefresh();
      } else {
        await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      }
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  return { refreshing, onRefresh: handleRefresh };
}
