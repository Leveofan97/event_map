import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const Profile = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate('/');
        return null;
    }

    return (
        <div className="container max-w-4xl py-8 px-4">
            <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                            {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-bold">{user?.name}</h1>
                        <p className="text-muted-foreground">{user?.email}</p>
                    </div>
                </div>
                <div className="space-x-2">
                    <Button variant="outline" onClick={() => navigate('/create')}>Создать событие</Button>
                    <Button variant="destructive" onClick={logout}>Выход</Button>
                </div>
            </div>

            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Тариф</h2>
                    <Button variant="outline" size="sm" className="h-8">Улучшить</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <Card className={`border-2 ${user?.isPremium ? 'border-primary' : ''}`}>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex justify-between items-center">
                                Базовый
                                {!user?.isPremium && <Badge>Текущий</Badge>}
                            </CardTitle>
                            <CardDescription>Бесплатный уровень</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mb-4">$0</div>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Создание до 5 событий</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Базовая аналитика</span>
                                </li>
                                <li className="flex items-center gap-2 text-muted-foreground">
                                    <span>✗</span>
                                    <span>Премиум инструменты продвижения</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className={`border-2 ${user?.isPremium ? 'border-primary' : ''} relative`}>
                        {user?.isPremium && (
                            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                                <Badge className="bg-primary">Текущий</Badge>
                            </div>
                        )}
                        <CardHeader className="pb-2">
                            <CardTitle>Premium</CardTitle>
                            <CardDescription>Для профессионалов</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mb-4">500 рублей<span className="text-sm font-normal text-muted-foreground">/месяц</span></div>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Безлимит на создание событий</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Продвинутая аналитика</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Премиум инструменты продвижения</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">
                                {user?.isPremium ? 'Управлять подпиской' : 'Получить'}
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle>Корпоративный</CardTitle>
                            <CardDescription>Для крупных игроков рынка</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mb-4">10000 рублей<span className="text-sm font-normal text-muted-foreground">/месяц</span></div>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Только Premium</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Интеграция с CRM</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Выделенная поддержка</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">Связать с нами</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            <Tabs defaultValue="myEvents">
                <TabsList className="mb-6">
                    <TabsTrigger value="myEvents">Мои события</TabsTrigger>
                    <TabsTrigger value="attending">Участвую</TabsTrigger>
                    <TabsTrigger value="analytics">Аналитика</TabsTrigger>
                </TabsList>

                <TabsContent value="myEvents">
                    <div className="bg-muted rounded-lg p-8 text-center">
                        <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">Нет событий</h3>
                        <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                            Вы еще не создали никаких событий. Создайте свое первое мероприятие.
                        </p>
                        <Button onClick={() => navigate('/create')}>Создать событие</Button>
                    </div>
                </TabsContent>

                <TabsContent value="attending">
                    <div className="bg-muted rounded-lg p-8 text-center">
                        <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">Не участвую в событиях</h3>
                        <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                            Вы пока не приняли участие ни в одном из событий.
                        </p>
                        <Button onClick={() => navigate('/')}>Откройте для себя события</Button>
                    </div>
                </TabsContent>

                <TabsContent value="analytics">
                    <div className="bg-muted rounded-lg p-8 text-center">
                        {user?.isPremium ? (
                            <div className="max-w-2xl mx-auto">
                                <h3 className="text-lg font-medium mb-6">Event Analytics</h3>
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="text-center">
                                                <div className="text-3xl font-bold">0</div>
                                                <p className="text-sm text-muted-foreground">Total Events</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="text-center">
                                                <div className="text-3xl font-bold">0</div>
                                                <p className="text-sm text-muted-foreground">Total Views</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="text-center">
                                                <div className="text-3xl font-bold">0</div>
                                                <p className="text-sm text-muted-foreground">Total Attendees</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="h-64 w-full bg-card border rounded-lg flex items-center justify-center">
                                    <p className="text-muted-foreground">No analytics data available yet</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">Аналитика доступна в премиум тарифе</h3>
                                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                                    Обновите до Premium, чтобы получить доступ к подробной аналитике для ваших мероприятий.
                                </p>
                                <Button>Улучшить до Premium</Button>
                            </>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Profile;
