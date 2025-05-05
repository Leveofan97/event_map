import React, { useState } from 'react';
import { useEvents } from '@/contexts/EventsContext';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { CalendarIcon, FilterX } from 'lucide-react';

const EventFilters = () => {
    const { categories, filterEvents, activeFilters } = useEvents();
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategorySelect = (category: string) => {
        const newCategory = selectedCategory === category ? null : category;
        setSelectedCategory(newCategory);
        filterEvents(newCategory, dateRange);
    };

    const handleDateSelect = (date: Date | null) => {
        const newRange: [Date | null, Date | null] = dateRange[0] ? [dateRange[0], date] : [date, null];
        if (date && dateRange[0] && date < dateRange[0]) {
            newRange[0] = date;
            newRange[1] = null;
        }
        setDateRange(newRange);
        if (newRange[0] && newRange[1]) {
            filterEvents(selectedCategory, newRange);
        }
    };

    const clearFilters = () => {
        setSelectedCategory(null);
        setDateRange([null, null]);
        filterEvents(null, [null, null]);
    };

    const hasActiveFilters = selectedCategory !== null || dateRange[0] !== null;

    return (
        <div className="px-3 py-2">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Фильтры</h3>
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="h-8 px-2 text-xs"
                    >
                        <FilterX className="h-3.5 w-3.5 mr-1" />
                        Сбросить
                    </Button>
                )}
            </div>

            <ScrollArea className="whitespace-nowrap pb-2">
                <div className="flex gap-2 pb-1">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={dateRange[0] ? "default" : "outline"}
                                size="sm"
                                className={`text-xs h-8 ${dateRange[0] ? 'bg-primary text-primary-foreground' : ''}`}
                            >
                                <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                                {dateRange[0] && dateRange[1]
                                    ? `${format(dateRange[0], "MMM d")} - ${format(dateRange[1], "MMM d")}`
                                    : dateRange[0]
                                        ? `Когда ${format(dateRange[0], "MMM d")}`
                                        : "Дата"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="range"
                                selected={{
                                    from: dateRange[0] || undefined,
                                    to: dateRange[1] || undefined,
                                }}
                                onSelect={(range) => {
                                    setDateRange([range?.from || null, range?.to || null]);
                                    filterEvents(selectedCategory, [range?.from || null, range?.to || null]);
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>

                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            size="sm"
                            className={`text-xs h-8 ${
                                selectedCategory === category ? 'bg-primary text-primary-foreground' : ''
                            }`}
                            onClick={() => handleCategorySelect(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
};

export default EventFilters;
