import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export interface EventLocation {
    lat: number;
    lng: number;
    address: string;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    location: EventLocation;
    date: string;
    time: string;
    category: string;
    organizerId: string;
    organizer: string;
    imageUrl?: string;
    isPremium: boolean;
    attendees: number;
}

interface EventsContextType {
    events: Event[];
    categories: string[];
    getEvent: (id: string) => Event | undefined;
    addEvent: (event: Omit<Event, "id" | "organizerId" | "organizer">) => void;
    filterEvents: (category: string | null, dateRange: [Date | null, Date | null]) => void;
    filteredEvents: Event[];
    activeFilters: {
        category: string | null;
        dateRange: [Date | null, Date | null];
    };
}

const EventsContext = createContext<EventsContextType>({} as EventsContextType);

export const useEvents = () => useContext(EventsContext);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [activeFilters, setActiveFilters] = useState<{
        category: string | null;
        dateRange: [Date | null, Date | null];
    }>({
        category: null,
        dateRange: [null, null]
    });

    const categories = [
        "Спорт",
        "Музыка",
        "Бизнес",
        "Исскуство",
        "Технологии",
        "Еда",
        "Образование",
        "Здоровье",
        "Социальные"
    ];

    // Initialize with mock data
    useEffect(() => {
        const mockEvents: Event[] = [
            {
                id: "event-1",
                title: "Турнир по шахматам",
                description: "Присоединяйтесь к нашему любительскому шахматному турниру, открытому для всех уровней квалификации. Призы для лучших игроков гарантированы!",
                location: { lat: 55.7558, lng: 37.6176, address: "Московский центральный шахматный клуб" },
                date: "2025-06-15",
                time: "12:00",
                category: "Спорт",
                organizerId: "user-1",
                organizer: "Chess Lover",
                imageUrl: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f",
                isPremium: false,
                attendees: 42
            },
            {
                id: "event-2",
                title: "Ежегодный джазовый фестиваль",
                description: "Познакомьтесь с лучшими джазовыми музыкантами на нашем ежегодном фестивале. Еда и напитки доступны.",
                location: { lat: 55.7539, lng: 37.6208, address: "Московский концертный зал" },
                date: "2025-07-10",
                time: "18:00",
                category: "Музыка",
                organizerId: "org-1",
                organizer: "Московская музыкальная ассоциация",
                imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629",
                isPremium: true,
                attendees: 156
            },
            {
                id: "event-3",
                title: "Технологическая стартап встреча",
                description: "Знакомьтесь с IT-предпринимателями и инвесторами. Представляйте свои проекты!",
                location: { lat: 55.7516, lng: 37.6145, address: "Московский инновационный центр" },
                date: "2025-06-22",
                time: "19:30",
                category: "Технологии",
                organizerId: "org-2",
                organizer: "StartupRussia",
                imageUrl: "https://images.unsplash.com/photo-1530133532239-eda6f53fcf0f",
                isPremium: true,
                attendees: 89
            },
            {
                id: "event-4",
                title: "Современная художественная выставка",
                description: "Стрит-арт meets contemporary: новые герои городской культуры",
                location: { lat: 55.7602, lng: 37.6178, address: "Современная художественная галерея" },
                date: "2025-06-18",
                time: "10:00",
                category: "Исскуство",
                organizerId: "org-3",
                organizer: "Московский художественный коллектив",
                imageUrl: "https://n1s1.hsmedia.ru/ca/f2/5c/caf25cf1d3af10d784db4f0c27e2e54d/727x485_1_ee1c8f9de17e2dcf890a3e22fa12bbb5@4000x2667_0xac120003_2132176911640873891.jpeg.webp",
                isPremium: false,
                attendees: 67
            },
            {
                id: "event-5",
                title: "Фестиваль уличной еды",
                description: "Разбуди свои вкусовые рецепторы на фестивале мировой street food!",
                location: { lat: 55.7522, lng: 37.6256, address: "Парк Горького" },
                date: "2025-07-05",
                time: "12:00",
                category: "Еда",
                organizerId: "org-4",
                organizer: "FoodLovers Moscow",
                imageUrl: "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb",
                isPremium: false,
                attendees: 211
            }
        ];

        setEvents(mockEvents);
        setFilteredEvents(mockEvents);
    }, []);

    const getEvent = (id: string) => {
        return events.find(event => event.id === id);
    };

    const addEvent = (eventData: Omit<Event, "id" | "organizerId" | "organizer">) => {
        const newEvent: Event = {
            ...eventData,
            id: `event-${events.length + 1}`,
            organizerId: "user-1", // would come from authenticated user
            organizer: "Current User", // would come from authenticated user
            attendees: 0
        };

        setEvents(prevEvents => [...prevEvents, newEvent]);
        setFilteredEvents(prevEvents => [...prevEvents, newEvent]);

        toast({
            title: "Событие создано",
            description: "Ваше событие успешно создано."
        });
    };

    const filterEvents = (category: string | null, dateRange: [Date | null, Date | null]) => {
        setActiveFilters({ category, dateRange });

        let filtered = [...events];

        if (category) {
            filtered = filtered.filter(event => event.category === category);
        }

        if (dateRange[0]) {
            const startDate = dateRange[0];
            filtered = filtered.filter(event => new Date(event.date) >= startDate);
        }

        if (dateRange[1]) {
            const endDate = dateRange[1];
            filtered = filtered.filter(event => new Date(event.date) <= endDate);
        }

        setFilteredEvents(filtered);
    };

    return (
        <EventsContext.Provider
            value={{
                events,
                categories,
                getEvent,
                addEvent,
                filterEvents,
                filteredEvents,
                activeFilters
            }}
        >
            {children}
        </EventsContext.Provider>
    );
};