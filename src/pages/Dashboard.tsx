
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, BookText, Calendar, FileText, MessageCircle, 
  TrendingUp, Users, BookOpen, Bookmark, Clock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectCard, { ProjectCardProps } from '@/components/ui/ProjectCard';

// Sample recent publications data
const recentPublications: ProjectCardProps[] = [
  {
    id: '4',
    title: 'The Ethics of Artificial Intelligence in Academic Research',
    abstract: 'An exploration of ethical considerations when implementing AI systems for educational research and academic purposes.',
    date: 'July 2, 2023',
    category: 'Ethics',
    authors: [
      { id: '10', name: 'Thomas Wilson', role: 'Professor', avatarUrl: 'https://i.pravatar.cc/150?img=16' },
      { id: '11', name: 'Sophia Lee', role: 'Student', avatarUrl: 'https://i.pravatar.cc/150?img=25' },
    ],
    commentsCount: 7,
    tags: ['AI Ethics', 'Research', 'Education'],
    saved: false,
  },
  {
    id: '5',
    title: 'Renewable Energy Integration in Campus Architecture',
    abstract: 'Case study on implementing renewable energy solutions in college campus buildings and infrastructure.',
    coverImage: 'https://images.unsplash.com/photo-1522162363424-d29ded2ad958?q=80&w=2071&auto=format&fit=crop',
    date: 'June 28, 2023',
    category: 'Architecture',
    authors: [
      { id: '12', name: 'Elena Rodriguez', role: 'Professor', avatarUrl: 'https://i.pravatar.cc/150?img=29' },
    ],
    commentsCount: 3,
    tags: ['Renewable Energy', 'Architecture', 'Sustainability'],
    saved: true,
  },
];

// Sample upcoming events
const upcomingEvents = [
  {
    id: '1',
    title: 'Annual Research Symposium',
    date: 'August 15, 2023',
    time: '9:00 AM - 5:00 PM',
    location: 'Main Auditorium',
    organizer: 'Research Department',
  },
  {
    id: '2',
    title: 'AI in Education Workshop',
    date: 'July 22, 2023',
    time: '2:00 PM - 4:00 PM',
    location: 'Computer Science Lab',
    organizer: 'CS Department',
  },
  {
    id: '3',
    title: 'Thesis Defense: Quantum Computing Applications',
    date: 'July 25, 2023',
    time: '11:00 AM - 12:30 PM',
    location: 'Physics Department, Room 302',
    organizer: 'Graduate Studies Office',
  },
];

// Sample notifications
const notifications = [
  {
    id: '1',
    type: 'comment',
    message: 'Maria Garcia commented on your publication',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'publication',
    message: 'New publication in your field: "Advances in Quantum Computing"',
    time: '1 day ago',
    read: true,
  },
  {
    id: '3',
    type: 'event',
    message: 'Reminder: Research Symposium registration closes tomorrow',
    time: '2 days ago',
    read: true,
  },
];

// Sample active researchers
const activeResearchers = [
  {
    id: '1',
    name: 'Dr. Alex Johnson',
    role: 'Professor, Computer Science',
    publications: 45,
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: '2',
    name: 'Dr. Sarah Chen',
    role: 'Professor, Architecture',
    publications: 37,
    avatarUrl: 'https://i.pravatar.cc/150?img=20',
  },
  {
    id: '3',
    name: 'Maria Garcia',
    role: 'PhD Student, Data Science',
    publications: 12,
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Research Assistant, Biology',
    publications: 8,
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
  },
];

const Dashboard = () => {
  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold animate-fade-in">Dashboard</h1>
            <p className="text-muted-foreground mt-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Welcome back! Here's what's happening in your academic community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <BookText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-2xl font-display font-bold">12</div>
                    <p className="text-sm text-muted-foreground">Publications</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-2xl font-display font-bold">87</div>
                    <p className="text-sm text-muted-foreground">Citations</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-2xl font-display font-bold">24</div>
                    <p className="text-sm text-muted-foreground">Connections</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-2xl font-display font-bold">36</div>
                    <p className="text-sm text-muted-foreground">Comments</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Recent Activity */}
              <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest updates from your network and publications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="publications">
                    <TabsList className="mb-4">
                      <TabsTrigger value="publications">Publications</TabsTrigger>
                      <TabsTrigger value="discussions">Discussions</TabsTrigger>
                      <TabsTrigger value="saved">Saved</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="publications" className="space-y-4">
                      {recentPublications.map(publication => (
                        <ProjectCard key={publication.id} {...publication} />
                      ))}
                      
                      <div className="text-center mt-6">
                        <Button variant="outline" asChild>
                          <Link to="/publications">View All Publications</Link>
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="discussions">
                      <div className="p-6 text-center">
                        <MessageCircle className="h-12 w-12 text-muted mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No recent discussions</h3>
                        <p className="text-muted-foreground mb-4">
                          Join conversations or start a new discussion topic.
                        </p>
                        <Button>Start a Discussion</Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="saved">
                      <div className="p-6 text-center">
                        <Bookmark className="h-12 w-12 text-muted mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Your saved items</h3>
                        <p className="text-muted-foreground mb-4">
                          You have 1 saved publication. Save more to build your research library.
                        </p>
                        <Button variant="outline" asChild>
                          <Link to="/publications">Browse Publications</Link>
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Profile Summary */}
              <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src="https://i.pravatar.cc/150?img=68" alt="Your Profile" />
                      <AvatarFallback>YP</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-medium">James Wilson</h3>
                    <p className="text-muted-foreground">Computer Science, 3rd Year</p>
                    
                    <div className="grid grid-cols-3 gap-4 w-full mt-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold">12</div>
                        <div className="text-xs text-muted-foreground">Papers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">87</div>
                        <div className="text-xs text-muted-foreground">Citations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">24</div>
                        <div className="text-xs text-muted-foreground">Connections</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 w-full">
                      <Button className="w-full" asChild>
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Upcoming Events */}
              <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-primary/10 text-xs font-medium">
                            {event.date.split(' ')[1].slice(0, 3)}
                            <div className="text-xl font-bold">{event.date.split(' ')[0]}</div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">{event.title}</h4>
                            <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {event.time}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {event.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/events">View All Events</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Notifications */}
              <Card className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`flex items-start gap-3 p-3 rounded-lg border ${notification.read ? 'border-border' : 'border-primary/20 bg-primary/5'}`}
                      >
                        <div className={`p-2 rounded-full ${notification.read ? 'bg-muted' : 'bg-primary/20'}`}>
                          {notification.type === 'comment' && <MessageCircle className="h-4 w-4 text-primary" />}
                          {notification.type === 'publication' && <FileText className="h-4 w-4 text-primary" />}
                          {notification.type === 'event' && <Calendar className="h-4 w-4 text-primary" />}
                        </div>
                        <div>
                          <p className="text-sm">{notification.message}</p>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Active Researchers */}
              <Card className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Active Researchers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeResearchers.map(researcher => (
                      <div key={researcher.id} className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={researcher.avatarUrl} alt={researcher.name} />
                          <AvatarFallback>{researcher.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{researcher.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{researcher.role}</p>
                        </div>
                        <Badge variant="outline" className="ml-auto">
                          {researcher.publications} papers
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
