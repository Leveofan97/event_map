import React, { createContext, useContext, useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface User {
    id: string;
    name: string;
    email: string;
    isPremium: boolean;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isPremium: boolean;
    login: (email: string, password: string) => void;
    register: (name: string, email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string, password: string) => {
        if (email && password) {
            const mockUser = {
                id: "user-1",
                name: email.split('@')[0],
                email,
                isPremium: email.includes('premium'),
            };
            setUser(mockUser);
            toast({
                title: "Успешный вход",
                description: `Добро пожаловать, ${mockUser.name}!`,
            });
        }
    };

    const register = (name: string, email: string, password: string) => {
        if (name && email && password) {
            const mockUser = {
                id: "user-" + Math.floor(Math.random() * 1000),
                name,
                email,
                isPremium: false,
            };
            setUser(mockUser);
            toast({
                title: "Аккаунт создан",
                description: "Ваш аккаунт успешно создан!",
            });
        }
    };

    const logout = () => {
        setUser(null);
        toast({
            title: "Успешный выход",
            description: "Вы успешно вышли.",
        });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isPremium: user?.isPremium || false,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
