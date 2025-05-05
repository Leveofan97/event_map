import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEvents } from '@/contexts/EventsContext';
import { useMap } from '@/contexts/MapContext';
import { Calendar, MapPin, Filter, X } from 'lucide-react';
import EventFilters from './EventFilters';
import EventListItem from './EventListItem';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const { pathname } = useLocation();
    const { filteredEvents } = useEvents();
    const { setSelectedEventId } = useMap();
    const isMobile = useIsMobile();

    const sidebarClass = `
    ${isMobile ? 'fixed inset-y-0 left-0 z-40 transform h-screen' : 'relative h-screen'}
    bg-background border-r transition-transform duration-300 ease-in-out w-72
    ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : ''}
  `;

    return (
        <div className={sidebarClass}>
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-lg font-heading font-semibold">События</h2>
                    {isMobile && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    )}
                </div>

                <EventFilters />

                <div className="px-4 py-2">
                    <p className="text-sm font-semibold">
                        {filteredEvents.length} {filteredEvents.length === 1 ? 'событие' : 'событий'} найдено
                    </p>
                </div>

                <ScrollArea className="flex-1">
                    <div className="p-4 space-y-4">
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event) => (
                                <EventListItem
                                    key={event.id}
                                    event={event}
                                    onClick={() => {
                                        setSelectedEventId(event.id);
                                        if (isMobile) {
                                            setIsOpen(false);
                                        }
                                    }}
                                />
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center p-6">
                                <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
                                <h3 className="font-medium">Нет событий</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Try adjusting your filters or create a new event
                                </p>
                                <Button asChild variant="outline" className="mt-4">
                                    <Link to="/create">Create Event</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>

            {/* Overlay to close the sidebar on mobile */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default Sidebar;