import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
    MapPin,
    Calendar,
    Users,
    Building,
    TrendingUp,
    Share2,
    UserCheck,
    BadgeDollarSign
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
    return (
        <div className="container max-w-4xl py-8 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Event Map
          </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Создавайте и публикуйте мероприятия на удобной платформе, разработанной как для частных организаторов, так и для бизнеса. Простое управление, широкий охват аудитории и интерактивные инструменты помогут вам привлекать больше участников.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Наша платформа</h2>
                    <p className="text-muted-foreground mb-6">
                        Event Map - это уникальная платформа, которая визуализирует события на интерактивной карте, что облегчает людям узнать, что происходит вокруг них. Если вы хотите посетить местный шахматный турнир или организовывать крупную бизнес -конференцию, наша платформа предоставляет необходимые вам инструменты.
                    </p>
                    <p className="text-muted-foreground mb-6">
                        Мы считаем, что местоположение является важной частью идентичности любого события, поэтому мы создали нашу платформу вокруг интерактивной карты, которая показывает, где именно происходят события.
                    </p>
                    <Button asChild>
                        <Link to="/">Откройте для себя события</Link>
                    </Button>
                </div>
                <div className="bg-muted rounded-lg p-6 flex items-center justify-center">
                    <div className="aspect-video w-full relative bg-card border rounded-md overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <MapPin className="h-16 w-16 text-muted-foreground/30" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-4">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                <span className="text-sm">Спорт</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                                <span className="text-sm">Музыка</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-center">Ключевые особенности</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <MapPin className="h-6 w-6 text-primary mb-2" />
                            <CardTitle className="text-base">Поиск на карте</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Находите мероприятия по локации на интерактивной карте
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <Calendar className="h-6 w-6 text-primary mb-2" />
                            <CardTitle className="text-base">Создание событий</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Простое создание и управление событиями
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <TrendingUp className="h-6 w-6 text-primary mb-2" />
                            <CardTitle className="text-base">Аналитика</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Подробная статистика посещаемости ваших событий
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <Share2 className="h-6 w-6 text-primary mb-2" />
                            <CardTitle className="text-base">Продвижение</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Увеличьте охват аудитории с инструментами продвижения
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-center">Для кого это</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <UserCheck className="h-5 w-5 text-primary" />
                                <CardTitle>Частные пользователи</CardTitle>
                            </div>
                            <CardDescription>
                                Идеально для тех, кто хочет создавать и делиться событиями
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">✓</span>
                                    <span>Создавайте локальные мероприятия: турниры, клубы по интересам и т.д.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">✓</span>
                                    <span>Открывайте интересные события рядом с вами</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">✓</span>
                                    <span>Знакомьтесь с единомышленниками</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <Building className="h-5 w-5 text-primary" />
                                <CardTitle>Бизнес и организации</CardTitle>
                            </div>
                            <CardDescription>
                                Полный набор инструментов для управления событиями
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">✓</span>
                                    <span>Детальная аналитика и отслеживание показателей</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">✓</span>
                                    <span>Интеграция с CRM-системами</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">✓</span>
                                    <span>Продвижение мероприятий для максимального охвата</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Готовы начать работу?</h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                    Откройте для себя события вокруг или организуйте собственные!
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Button asChild size="lg">
                        <Link to="/">Откройте для себя события</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link to="/create">Создай свое событие</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default About;