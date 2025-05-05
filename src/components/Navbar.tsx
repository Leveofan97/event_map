import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, User, MapPin, Plus, Search } from 'lucide-react';
import { useMap } from '@/contexts/MapContext';

interface NavbarProps {
    toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
    const { user, isAuthenticated, login, register, logout } = useAuth();
    const { isMapLoaded } = useMap();

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password);
        setIsLoginOpen(false);
        setEmail('');
        setPassword('');
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        register(name, email, password);
        setIsRegisterOpen(false);
        setName('');
        setEmail('');
        setPassword('');
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
            <div className="flex h-16 items-center px-4 md:px-6">
                <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleSidebar}>
                    <Menu className="h-5 w-5" />
                </Button>

                <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl">
                    <MapPin className="h-6 w-6 text-primary" />
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Event Map
          </span>
                </Link>

                <div className="hidden md:flex items-center gap-6 mx-6">
                    <Link to="/" className="text-sm font-medium hover:text-primary">Карта</Link>
                    <Link to="/about" className="text-sm font-medium hover:text-primary">О системе</Link>
                </div>

                <div className="ml-auto flex items-center gap-4">
                    {isMapLoaded && (
                        <Button asChild size="sm" variant="outline" className="hidden sm:flex">
                            <Link to="/create">
                                <Plus className="h-4 w-4 mr-2" />
                                Создать событие
                            </Link>
                        </Button>
                    )}

                    {!isAuthenticated ? (
                        <>
                            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">Войти</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Войти</DialogTitle>
                                        <DialogDescription>Введите свои учетные данные.</DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleLogin}>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="email@example.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="password">Пароль</Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button variant="outline" type="button" onClick={() => {
                                                setIsLoginOpen(false);
                                                setIsRegisterOpen(true);
                                            }}>Регистрация</Button>
                                            <Button type="submit">Войти</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>

                            <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
                                <DialogTrigger asChild>
                                    <Button>Регистрация</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Регистрация</DialogTitle>
                                        <DialogDescription>Введите свои данные, чтобы создать новую учетную запись.</DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleRegister}>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="name">Имя</Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    placeholder="John Doe"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="reg-email">Email</Label>
                                                <Input
                                                    id="reg-email"
                                                    type="email"
                                                    placeholder="email@example.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="reg-password">Пароль</Label>
                                                <Input
                                                    id="reg-password"
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button variant="outline" type="button" onClick={() => {
                                                setIsRegisterOpen(false);
                                                setIsLoginOpen(true);
                                            }}>Войти</Button>
                                            <Button type="submit">Регистрация</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="" alt={user?.name} />
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col">
                                        <span>{user?.name}</span>
                                        <span className="text-xs text-muted-foreground">{user?.email}</span>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to="/profile" className="cursor-pointer">Профиль</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/create" className="cursor-pointer">Создать события</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                                    Выход
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;