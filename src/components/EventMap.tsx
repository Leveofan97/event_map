import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { useEvents, Event } from '@/contexts/EventsContext';
import { useMap as useMapContext } from '@/contexts/MapContext';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { useIsMobile } from '@/hooks/use-mobile';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

let DefaultIcon = L.icon({
    iconRetinaUrl: icon,
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapController = () => {
    const { mapCenter, mapZoom, setIsMapLoaded, setMapCenter, setMapZoom } = useMapContext();
    const map = useMap();

    useEffect(() => {
        map.setView([mapCenter[1], mapCenter[0]], mapZoom);
        setIsMapLoaded(true);

        const handleMoveEnd = () => {
            const center: [number, number] = [map.getCenter().lng, map.getCenter().lat];
            const zoom = map.getZoom();

            setMapCenter(center);
            setMapZoom(zoom);
        };

        map.on('moveend', handleMoveEnd);

        return () => {
            map.off('moveend', handleMoveEnd);
            setIsMapLoaded(false);
        };
    }, [mapCenter, mapZoom, setIsMapLoaded, setMapCenter, setMapZoom]);

    return null;
};

const EventMap: React.FC = () => {
    const { filteredEvents } = useEvents();
    const {
        mapCenter,
        mapZoom,
        selectedEventId,
        setSelectedEventId
    } = useMapContext();
    const isMobile = useIsMobile();

    const getCategoryColor = (category: string): string => {
        const categoryColors: Record<string, string> = {
            'Sports': '#3b82f6',      // blue-500
            'Music': '#8b5cf6',       // violet-500
            'Business': '#10b981',    // emerald-500
            'Art': '#ec4899',         // pink-500
            'Technology': '#6366f1',  // indigo-500
            'Food': '#f59e0b',        // amber-500
            'Education': '#14b8a6',   // teal-500
            'Health': '#ef4444',      // red-500
            'Community': '#8b5cf6',   // violet-500
        };

        return categoryColors[category] || '#6b7280'; // gray-500 as default
    };

    const createMarkerIcon = (event: Event) => {
        const iconSize = isMobile ? 24 : 32;

        return divIcon({
            className: '',
            iconSize: [iconSize, iconSize],
            iconAnchor: [iconSize/2, iconSize/2],
            html: `<div class="event-marker" style="background-color: ${getCategoryColor(event.category)}; width: ${iconSize}px; height: ${iconSize}px;">
               <span>${event.category[0]}</span>
             </div>`
        });
    };

    return (
        <div className="relative w-full h-full">
            <MapContainer
                center={[mapCenter[1], mapCenter[0]]} // Leaflet uses [lat, lng] format
                zoom={mapZoom}
                style={{ height: "100%", width: "100%" }}
                whenReady={() => {}}
                attributionControl={false}
                zoomControl={isMobile ? false : true}
                className="leaflet-container"
            >
                <MapController />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {filteredEvents.map((event) => (
                    <Marker
                        key={event.id}
                        position={[event.location.lat, event.location.lng]}
                        icon={createMarkerIcon(event)}
                        eventHandlers={{
                            click: () => {
                                setSelectedEventId(event.id);
                            }
                        }}
                    >
                        <Popup>
                            <div className="">
                                <img
                                    src={event.imageUrl}
                                    alt={event.title}
                                    className="rounded-md w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                                <h3 className="font-medium text-base">{event.title}</h3>
                                <p className="text-sm text-gray-500">{event.location.address}</p>
                                <Link
                                    to={`/events/${event.id}`}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                >
                                    Посмотреть детали
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default EventMap;