import React from 'react';
import EventMap from '@/components/EventMap';
import { useMap } from '@/contexts/MapContext';

const MapView = () => {
    const { isMapLoaded } = useMap();

    return (
        <div className="relative w-full h-full">
            <EventMap />

            {!isMapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            )}
        </div>
    );
};

export default MapView;