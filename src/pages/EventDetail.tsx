import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEvents } from '@/contexts/EventsContext';
import { useMap } from '@/contexts/MapContext';
import { format, parseISO } from 'date-fns';
import {
    Calendar,
    Clock,
    MapPin,
    User,
    Users,
    Share2,
    ChevronLeft,
    Building,
    Ticket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const EventDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getEvent } = useEvents();
    const { flyTo } = useMap();
    const isMobile = useIsMobile();

    const event = getEvent(id || '');

    useEffect(() => {
        if (!event) {
            navigate('/');
            return;
        }

        flyTo([event.location.lng, event.location.lat], 15);
    }, [event, id, navigate]);

    if (!event) return null;

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: event.title,
                text: event.description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast({
                title: "Ссылка скопирована",
                description: "Теперь вы можете поделиться этим с другими.",
            });
        }
    };

    return (
        <div className="container max-w-4xl py-4 md:py-8 px-4 md:px-6">
            <Button
                variant="ghost"
                size="sm"
                className="mb-4 md:mb-6"
                onClick={() => navigate('/')}
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Назад к карте
            </Button>

            <div className="space-y-6 md:space-y-8">
                {/* Header */}
                <div>
                    {event.imageUrl ? (
                        <div className="w-full h-48 md:h-80 rounded-lg md:rounded-xl overflow-hidden mb-4 md:mb-6">
                            <img
                                src={event.imageUrl}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-32 bg-muted rounded-lg md:rounded-xl mb-4 md:mb-6 flex items-center justify-center">
                            <Calendar className="h-12 md:h-16 w-12 md:w-16 text-muted-foreground/50" />
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                            <div className="flex flex-wrap gap-2 mb-2">
                                <Badge variant="outline" className="font-normal">
                                    {event.category}
                                </Badge>
                                {event.isPremium && (
                                    <Badge className="bg-amber-500 hover:bg-amber-600">
                                        Premium Событие
                                    </Badge>
                                )}
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold">{event.title}</h1>
                        </div>

                        <div className="flex gap-2 mt-2 md:mt-0">
                            <Button variant="outline" size="sm" onClick={handleShare}>
                                <Share2 className="h-4 w-4 mr-2" />
                                Поделиться
                            </Button>

                            {!isMobile && (
                                <Button size="sm">
                                    <Ticket className="h-4 w-4 mr-2" />
                                    Участвовать
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3">О событии</h2>
                            <p className="text-muted-foreground whitespace-pre-line">
                                {event.description}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Местоположение</h2>
                            <div className="bg-muted rounded-lg p-3 md:p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="h-4 md:h-5 w-4 md:w-5 text-primary" />
                                    <span className="font-medium text-sm md:text-base">{event.location.address}</span>
                                </div>
                                <div className="h-32 md:h-56 rounded-md overflow-hidden bg-gray-100">
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                        Предварительный просмотр
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="bg-card rounded-lg border shadow-sm p-4 md:p-5 space-y-4 md:space-y-5 sticky top-20">
                            <div>
                                <h3 className="font-medium mb-2">Дата и время</h3>
                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                    <Calendar className="h-4 w-4" />
                                    <span>{format(parseISO(event.date), 'EEEE, MMMM d, yyyy')}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{event.time}</span>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="font-medium mb-2">Организатор</h3>
                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                    {event.isPremium ? (
                                        <Building className="h-4 w-4" />
                                    ) : (
                                        <User className="h-4 w-4" />
                                    )}
                                    <span>{event.organizer}</span>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="font-medium mb-2">Участники</h3>
                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                    <Users className="h-4 w-4" />
                                    <span>{event.attendees} {event.attendees === 1 ? 'участник' : 'участников'}</span>
                                </div>
                            </div>

                            <Button className="w-full">
                                <Ticket className="h-4 w-4 mr-2" />
                                Участвовать
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed bottom button for mobile */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t z-10">
                    <Button className="w-full">
                        <Ticket className="h-4 w-4 mr-2" />
                        Участвовать
                    </Button>
                </div>
            )}
        </div>
    );
};

export default EventDetail;