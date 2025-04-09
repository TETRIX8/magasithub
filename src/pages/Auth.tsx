
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { GraduationCap } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Успешно!",
        description: "Добро пожаловать в АкадемХаб",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Ошибка аутентификации",
        description: "Неверный email или пароль",
        variant: "destructive",
      });
      console.error('Ошибка аутентификации:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout showHeader={false}>
      <div className="flex items-center justify-center min-h-screen bg-muted/30">
        <div className="w-full max-w-md px-4">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-10 w-10 text-primary" />
              <span className="text-2xl font-display font-semibold tracking-tight">АкадемХаб</span>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Авторизация</CardTitle>
              <CardDescription>
                Войдите в свою учетную запись для доступа к АкадемХабу
              </CardDescription>
            </CardHeader>
            
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Войти</TabsTrigger>
                <TabsTrigger value="register" disabled>Регистрация</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleAuth}>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@example.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium">
                          Пароль
                        </label>
                        <a href="#" className="text-xs text-primary hover:underline">
                          Забыли пароль?
                        </a>
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                      />
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Вход...' : 'Войти'}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Auth;
