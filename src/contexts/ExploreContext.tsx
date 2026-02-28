import React, { createContext, useCallback, useContext, useRef, useState } from "react";

type ExploreContextValue = {
  isLayerTrayOpen: boolean;
  toggleLayerTray: () => void;
  closeLayerTray: () => void;
};

const ExploreContext = createContext<ExploreContextValue>({
  isLayerTrayOpen: false,
  toggleLayerTray: () => {},
  closeLayerTray: () => {},
});

export function ExploreProvider({ children }: { children: React.ReactNode }) {
  const [isLayerTrayOpen, setIsLayerTrayOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleLayerTray = useCallback(() => {
    if (debounceRef.current) return;
    setIsLayerTrayOpen((v) => !v);
    debounceRef.current = setTimeout(() => {
      debounceRef.current = null;
    }, 400);
  }, []);

  const closeLayerTray = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = null;
    setIsLayerTrayOpen(false);
  }, []);

  return (
    <ExploreContext.Provider
      value={{ isLayerTrayOpen, toggleLayerTray, closeLayerTray }}
    >
      {children}
    </ExploreContext.Provider>
  );
}

export function useExploreContext() {
  return useContext(ExploreContext);
}
