
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { lxpAuth } from '@/services/lxpAuth';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, BookOpen, Users, Award, Calendar } from 'lucide-react';

type Teacher = {
  user: {
    lastName: string;
    firstName: string;
    middleName: string;
  }
};

type DiaryItem = {
  discipline: {
    name: string;
    code: string;
    teachers: Teacher[];
  };
  disciplineGrade: number;
  maxScoreForAnsweredTasks: number;
  scoreForAnsweredTasks: number;
  disciplineAttendance: {
    percent: number;
    total: number;
    visited: number;
  };
};

const StudentDiary = () => {
  const { user } = useAuth();
  const [diaryData, setDiaryData] = useState<DiaryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiary = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const data = await lxpAuth.getStudentDiary(user.id);
        setDiaryData(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load diary data", err);
        setError("Не удалось загрузить данные дневника");
      } finally {
        setLoading(false);
      }
    };

    fetchDiary();
  }, [user]);
  
  const formatTeachers = (teachers: Teacher[]) => {
    return teachers.map(teacher => 
      `${teacher.user.lastName} ${teacher.user.firstName} ${teacher.user.middleName}`
    ).join(', ');
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Электронный дневник</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Электронный дневник</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!diaryData || diaryData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Электронный дневник</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Данные дневника не найдены</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Электронный дневник</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {diaryData.map((item, index) => (
            <div key={index} className="border rounded-lg p-5 hover:bg-muted/50 transition-colors">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {item.discipline.name}
              </h3>
              <div className="text-sm text-muted-foreground mb-3">
                Код дисциплины: {item.discipline.code}
              </div>
              
              <div className="grid gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-medium">Преподаватели:</span>
                  <span>{formatTeachers(item.discipline.teachers)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="font-medium">Оценка:</span>
                  <span>
                    {item.disciplineGrade || 'Нет'} 
                    ({item.scoreForAnsweredTasks}/{item.maxScoreForAnsweredTasks} баллов)
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">Посещаемость:</span>
                  <span>
                    {item.disciplineAttendance.visited}/{item.disciplineAttendance.total} 
                    ({item.disciplineAttendance.percent}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentDiary;
