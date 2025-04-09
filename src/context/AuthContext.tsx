
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { lxpAuth } from '@/services/lxpAuth';
import { LXPUser } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: LXPUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LXPUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load user data on initial render
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (lxpAuth.isAuthenticated()) {
          const userData = await lxpAuth.getUserData();
          setUser(userData);
        }
      } catch (err) {
        console.error("Error loading user data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      await lxpAuth.signIn(email, password);
      const userData = await lxpAuth.getUserData();
      
      setUser(userData);
      
      toast({
        title: "Успешный вход",
        description: `Добро пожаловать, ${userData.firstName}!`,
      });
    } catch (err: any) {
      setError(err.message || "Ошибка при входе");
      toast({
        title: "Ошибка авторизации",
        description: err.message || "Проверьте ваши учетные данные и попробуйте снова",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    lxpAuth.signOut();
    setUser(null);
    toast({
      title: "Выход",
      description: "Вы успешно вышли из системы",
    });
  };

  const refreshUserData = async () => {
    try {
      setLoading(true);
      const userData = await lxpAuth.getUserData();
      setUser(userData);
    } catch (err: any) {
      setError(err.message || "Ошибка при обновлении данных");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
