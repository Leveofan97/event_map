import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '@/contexts/EventsContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Clock, Info } from 'lucide-react';
import { format } from 'date-fns';

const CreateEvent = () => {
    const navigate = useNavigate();
    const { addEvent, categories } = useEvents();
    const { isAuthenticated } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: {
            address: '',
            lat: 55.7558, // Координаты Москвы
            lng: 37.6176
        },
        date: new Date(),
        time: '12:00',
        category: '',
        imageUrl: '',
        isPremium: false
    });

    const [isDateOpen, setIsDateOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isAuthenticated) {
        return (
            <div className="container max-w-md py-12 px-4 text-center">
                <Info className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h1 className="text-2xl font-bold mb-3">Войдите в систему</h1>
                <p className="text-muted-foreground mb-6">
                    Вы должны войти в систему, чтобы создать события..
                </p>
                <Button onClick={() => navigate('/')}>
                    Назад
                </Button>
            </div>
        );
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            location: {
                ...prev.location,
                [name]: value
            }
        }));
    };

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            setFormData(prev => ({
                ...prev,
                date
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.location.address || !formData.category) {
            toast({
                variant: "destructive",
                title: "Внимание",
                description: "Заполните все обязательные поля.",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const formattedDate = format(formData.date, 'yyyy-MM-dd');

            addEvent({
                ...formData,
                date: formattedDate,
                attendees: 0
            });

            navigate('/');
        } catch (error) {
            console.error("Error creating event:", error);
            toast({
                variant: "destructive",
                title: "Ошибка",
                description: "Не удалось создать событие. Пожалуйста, попробуйте еще раз.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container max-w-2xl py-8 px-4">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Новое событие</h1>
                <p className="text-muted-foreground mt-1">
                    Заполните данные ниже, чтобы создать свое мероприятие
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-3">
                    <Label htmlFor="title">Название *</Label>
                    <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Введите название"
                        required
                    />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="description">Описание *</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Опишите ваше мероприятие"
                        className="min-h-32"
                        required
                    />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="category">Категория *</Label>
                    <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Выберите категорию мероприятия" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="address">Адрес проведения *</Label>
                    <Input
                        id="address"
                        name="address"
                        value={formData.location.address}
                        onChange={handleLocationChange}
                        placeholder="Введите адрес проводимого мероприятия"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-3">
                        <Label>Дата начала *</Label>
                        <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.date ? format(formData.date, 'PPP') : 'Pick a date'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={formData.date}
                                    onSelect={(date) => {
                                        handleDateChange(date);
                                        setIsDateOpen(false);
                                    }}
                                    initialFocus
                                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="time">Время начала *</Label>
                        <div className="relative">
                            <Input
                                id="time"
                                name="time"
                                type="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                required
                            />
                            <Clock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="imageUrl">Вставьте ссылку на изобраение (опционально) </Label>
                    <Input
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        placeholder="Вставьте ссылку на изображение описывающее ваше мероприятие"
                    />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/')}
                        disabled={isSubmitting}
                    >
                        Отмена
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Создание...' : 'Создать'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;