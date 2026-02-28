import React, { createContext, useCallback, useContext, useRef, useState } from "react";

export type MapFeatureType = "park" | "restaurant" | "debris-zone";

export type MapFeature = {
  type: MapFeatureType;
  name: string;
  address?: string;
  phone?: string;
  area?: number;
  subarea?: string;
};

type ExploreContextValue = {
  isLayerTrayOpen: boolean;
  toggleLayerTray: () => void;
  closeLayerTray: () => void;
  selectedFeature: MapFeature | null;
  openDetailTray: (feature: MapFeature) => void;
  closeDetailTray: () => void;
};

const ExploreContext = createContext<ExploreContextValue>({
  isLayerTrayOpen: false,
  toggleLayerTray: () => {},
  closeLayerTray: () => {},
  selectedFeature: null,
  openDetailTray: () => {},
  closeDetailTray: () => {},
});

export function ExploreProvider({ children }: { children: React.ReactNode }) {
  const [isLayerTrayOpen, setIsLayerTrayOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<MapFeature | null>(null);
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

  const openDetailTray = useCallback((feature: MapFeature) => {
    setIsLayerTrayOpen(false);
    setSelectedFeature(feature);
  }, []);

  const closeDetailTray = useCallback(() => {
    setSelectedFeature(null);
  }, []);

  return (
    <ExploreContext.Provider
      value={{
        isLayerTrayOpen,
        toggleLayerTray,
        closeLayerTray,
        selectedFeature,
        openDetailTray,
        closeDetailTray,
      }}
    >
      {children}
    </ExploreContext.Provider>
  );
}

export function useExploreContext() {
  return useContext(ExploreContext);
}
