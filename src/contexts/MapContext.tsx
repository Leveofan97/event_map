import React, { createContext, useContext, useState } from "react";

interface MapContextType {
    mapCenter: [number, number];
    mapZoom: number;
    setMapCenter: (center: [number, number]) => void;
    setMapZoom: (zoom: number) => void;
    flyTo: (center: [number, number], zoom?: number) => void;
    isMapLoaded: boolean;
    setIsMapLoaded: (loaded: boolean) => void;
    selectedEventId: string | null;
    setSelectedEventId: (id: string | null) => void;
}

const MapContext = createContext<MapContextType>({} as MapContextType);

export const useMap = () => useContext(MapContext);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mapCenter, setMapCenter] = useState<[number, number]>([37.6176, 55.7558]);
    const [mapZoom, setMapZoom] = useState<number>(12);
    const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

    const flyTo = (center: [number, number], zoom: number = 14) => {
        setMapCenter(center);
        setMapZoom(zoom);
    };

    return (
        <MapContext.Provider
            value={{
                mapCenter,
                mapZoom,
                setMapCenter,
                setMapZoom,
                flyTo,
                isMapLoaded,
                setIsMapLoaded,
                selectedEventId,
                setSelectedEventId
            }}
        >
            {children}
        </MapContext.Provider>
    );
};
