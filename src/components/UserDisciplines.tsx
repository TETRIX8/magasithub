
import React from 'react';
import { Calendar, Code, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const UserDisciplines = () => {
  const { user } = useAuth();

  if (!user || !user.teacher || !user.teacher.assignedDisciplines_V2) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Мои дисциплины</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Дисциплины не найдены</p>
        </CardContent>
      </Card>
    );
  }

  const disciplines = user.teacher.assignedDisciplines_V2;
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: ru });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Мои дисциплины</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {disciplines.map((course, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <h3 className="text-lg font-medium">{course.discipline.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Code className="w-4 h-4 mr-1" />
                {course.discipline.code}
              </div>
              {course.discipline.studyPeriods.map((period, i) => (
                <div key={i} className="mt-3 border-t pt-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    <span className="font-medium">{period.name}</span>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>
                      {formatDate(period.startDate)} - {formatDate(period.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDisciplines;
