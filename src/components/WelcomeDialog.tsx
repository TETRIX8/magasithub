
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InfoIcon, BookOpen, Users, FileText } from "lucide-react";

const WelcomeDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Проверяем, был ли уже первый запуск
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    
    if (!hasVisited) {
      // Если первый запуск, показываем диалог
      setIsOpen(true);
      // Устанавливаем флаг в localStorage
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl flex items-center justify-center gap-2">
            <InfoIcon className="h-6 w-6 text-blue-500" />
            Добро пожаловать в АкадемХаб  Вход запрещен ИСЛАМУ!!!!!
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Ваша академическая социальная сеть для обмена знаниями и исследованиями
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Публикации</h3>
              <p className="text-sm text-muted-foreground">
                Публикуйте и делитесь  своими научными работами и исследованиями
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Сообщество</h3>
              <p className="text-sm text-muted-foreground">
                Общайтесь с исследователями и студентами из вашего университета
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <BookOpen className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium">Академическое резюме</h3>
              <p className="text-sm text-muted-foreground">
                Создавайте и поддерживайте ваше академическое резюме и портфолио
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button className="w-full" onClick={handleClose}>
            Начать работу
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
