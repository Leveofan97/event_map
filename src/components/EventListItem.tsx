import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '@/contexts/EventsContext';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';

interface EventListItemProps {
    event: Event;
    onClick?: () => void;
}

const EventListItem: React.FC<EventListItemProps> = ({ event, onClick }) => {
    const eventDate = new Date(event.date);

    return (
        <div
            className="group rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={onClick}
        >
            <Link to={`/events/${event.id}`} className="flex flex-col">
                {event.imageUrl && (
                    <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                        <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                    </div>
                )}
                <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                        <Badge variant="outline" className="text-xs">
                            {event.category}
                        </Badge>
                        {event.isPremium && (
                            <Badge className="text-xs bg-amber-500 hover:bg-amber-600">Premium</Badge>
                        )}
                    </div>
                    <h3 className="font-medium line-clamp-1 text-sm mb-2">{event.title}</h3>
                    <div className="flex flex-col gap-1 text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{format(eventDate, 'MMMM d, yyyy')} at {event.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span className="line-clamp-1">{event.location.address}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground mt-1">
                            <Users className="h-3 w-3" />
                            <span>{event.attendees} {event.attendees === 1 ? 'участник' : 'участников'}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default EventListItem;