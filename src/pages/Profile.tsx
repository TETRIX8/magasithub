
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, BookOpen, Download, Edit, FileText, GraduationCap, 
  Link as LinkIcon, Mail, MapPin, Share2, User
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectCard, { ProjectCardProps } from '@/components/ui/ProjectCard';

// Sample publications data
const userPublications: ProjectCardProps[] = [
  {
    id: '1',
    title: 'Machine Learning Approaches for Predictive Analytics in Higher Education',
    abstract: 'This research explores how machine learning algorithms can be applied to predict student performance and improve educational outcomes in college settings.',
    coverImage: 'https://images.unsplash.com/photo-1581092921461-eab62e97a2d5?q=80&w=2070&auto=format&fit=crop',
    date: 'May 15, 2023',
    category: 'Computer Science',
    authors: [
      { id: '1', name: 'James Wilson', role: 'Student', avatarUrl: 'https://i.pravatar.cc/150?img=68' },
      { id: '2', name: 'Maria Garcia', role: 'Professor', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    ],
    commentsCount: 12,
    tags: ['Machine Learning', 'Education', 'Data Science'],
    saved: true,
  },
  {
    id: '2',
    title: 'Optimizing Database Performance for Large-Scale Academic Data',
    abstract: 'A study on optimizing database systems to handle large volumes of academic data while maintaining performance and accessibility.',
    date: 'March 10, 2023',
    category: 'Computer Science',
    authors: [
      { id: '1', name: 'James Wilson', role: 'Student', avatarUrl: 'https://i.pravatar.cc/150?img=68' },
    ],
    commentsCount: 5,
    tags: ['Databases', 'Performance Optimization', 'Big Data'],
    saved: false,
  },
];

// Sample user data
const userData = {
  name: 'James Wilson',
  role: 'Computer Science Student',
  year: '3rd Year',
  email: 'james.wilson@university.edu',
  location: 'University of Technology',
  website: 'jameswilson.io',
  bio: 'Computer Science student focusing on machine learning and database optimization. Passionate about educational technology and improving learning outcomes through data analysis.',
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      year: '2021 - Present',
    },
    {
      id: '2',
      degree: 'Associate Degree in Software Development',
      institution: 'Community College',
      year: '2019 - 2021',
    },
  ],
  experience: [
    {
      id: '1',
      position: 'Research Assistant',
      organization: 'AI & Data Science Lab',
      duration: 'Jun 2022 - Present',
      description: 'Assisting in research projects focused on applying machine learning techniques to educational data. Developing predictive models for student performance.',
    },
    {
      id: '2',
      position: 'Teaching Assistant',
      organization: 'Department of Computer Science',
      duration: 'Sep 2021 - May 2022',
      description: 'Assisted in teaching introductory programming courses. Conducted lab sessions and provided support to students.',
    },
  ],
  skills: [
    'Python', 'Machine Learning', 'Data Analysis', 'SQL', 'Database Design',
    'JavaScript', 'React', 'Git', 'Research Methodology', 'Academic Writing'
  ],
  publications: 12,
  citations: 87,
  projects: 8,
  awards: [
    {
      id: '1',
      title: 'Outstanding Student Researcher',
      issuer: 'Computer Science Department',
      year: '2022',
    },
    {
      id: '2',
      title: 'Best Paper Award',
      issuer: 'Student Research Symposium',
      year: '2021',
    },
  ],
};

const Profile = () => {
  const [resumeDownloaded, setResumeDownloaded] = useState(false);
  
  const handleDownloadResume = () => {
    // In a real app, this would trigger a PDF download
    setResumeDownloaded(true);
    setTimeout(() => setResumeDownloaded(false), 3000);
  };
  
  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-subtle overflow-hidden animate-fade-in">
              <div className="h-32 sm:h-40 bg-gradient-to-r from-blue-600 to-blue-400"></div>
              <div className="px-4 sm:px-6 pb-6 relative">
                <div className="flex flex-col sm:flex-row sm:items-end -mt-12 sm:-mt-16 mb-6 sm:mb-4 gap-4 sm:gap-6">
                  <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white shadow-md">
                    <AvatarImage src="https://i.pravatar.cc/150?img=68" alt={userData.name} />
                    <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl font-display font-bold">{userData.name}</h1>
                    <p className="text-muted-foreground">{userData.role} • {userData.year}</p>
                  </div>
                  <div className="flex gap-2 self-end">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <div className="flex items-center text-sm mb-2">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{userData.location}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center text-sm mb-2">
                      <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a href="#" className="text-primary hover:underline">{userData.website}</a>
                    </div>
                    <div className="flex items-center text-sm">
                      <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Computer Science Department</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">About</h3>
                  <p className="text-sm text-muted-foreground">{userData.bio}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-6">
                  {userData.skills.slice(0, 5).map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                  {userData.skills.length > 5 && (
                    <Badge variant="outline">+{userData.skills.length - 5} more</Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-6">
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-display font-bold">{userData.publications}</div>
                    <div className="text-xs text-muted-foreground">Publications</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-display font-bold">{userData.citations}</div>
                    <div className="text-xs text-muted-foreground">Citations</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-display font-bold">{userData.projects}</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-display font-bold">{userData.awards.length}</div>
                    <div className="text-xs text-muted-foreground">Awards</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Tabs defaultValue="publications">
                <TabsList className="mb-6">
                  <TabsTrigger value="publications">Publications</TabsTrigger>
                  <TabsTrigger value="resume">Curriculum Vitae</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                </TabsList>
                
                {/* Publications Tab */}
                <TabsContent value="publications" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-display font-semibold">Publications</h2>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/publications">View All</Link>
                    </Button>
                  </div>
                  
                  {userPublications.map(publication => (
                    <ProjectCard key={publication.id} {...publication} />
                  ))}
                </TabsContent>
                
                {/* CV Tab */}
                <TabsContent value="resume">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Curriculum Vitae</CardTitle>
                        <CardDescription>
                          Automatically generated academic resume
                        </CardDescription>
                      </div>
                      <Button 
                        onClick={handleDownloadResume}
                        disabled={resumeDownloaded}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {resumeDownloaded ? 'Downloaded' : 'Download PDF'}
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Personal Information */}
                      <div>
                        <div className="flex items-center mb-4">
                          <User className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="text-lg font-display font-semibold">Personal Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-sm pl-7">
                          <div>
                            <span className="font-medium">Name:</span> {userData.name}
                          </div>
                          <div>
                            <span className="font-medium">Role:</span> {userData.role}
                          </div>
                          <div>
                            <span className="font-medium">Email:</span> {userData.email}
                          </div>
                          <div>
                            <span className="font-medium">Location:</span> {userData.location}
                          </div>
                          <div>
                            <span className="font-medium">Website:</span> {userData.website}
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Education */}
                      <div>
                        <div className="flex items-center mb-4">
                          <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="text-lg font-display font-semibold">Education</h3>
                        </div>
                        <div className="space-y-4 pl-7">
                          {userData.education.map(edu => (
                            <div key={edu.id}>
                              <h4 className="text-base font-medium">{edu.degree}</h4>
                              <p className="text-sm text-muted-foreground">
                                {edu.institution} • {edu.year}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Experience */}
                      <div>
                        <div className="flex items-center mb-4">
                          <BookOpen className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="text-lg font-display font-semibold">Research Experience</h3>
                        </div>
                        <div className="space-y-4 pl-7">
                          {userData.experience.map(exp => (
                            <div key={exp.id}>
                              <h4 className="text-base font-medium">{exp.position}</h4>
                              <p className="text-sm text-muted-foreground">
                                {exp.organization} • {exp.duration}
                              </p>
                              <p className="text-sm mt-1">
                                {exp.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Publications Summary */}
                      <div>
                        <div className="flex items-center mb-4">
                          <FileText className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="text-lg font-display font-semibold">Publications</h3>
                        </div>
                        <div className="pl-7">
                          <p className="text-sm mb-4">
                            Author of {userData.publications} academic publications with a total of {userData.citations} citations.
                            Areas of research include machine learning, educational technology, and database optimization.
                          </p>
                          
                          <div className="space-y-3">
                            {userPublications.map(pub => (
                              <div key={pub.id} className="text-sm">
                                <p className="font-medium">{pub.title}</p>
                                <p className="text-muted-foreground text-xs">
                                  {pub.authors.map(a => a.name).join(', ')} • {pub.date} • {pub.category}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Skills */}
                      <div>
                        <div className="flex items-center mb-4">
                          <Award className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="text-lg font-display font-semibold">Skills & Awards</h3>
                        </div>
                        <div className="pl-7">
                          <h4 className="text-base font-medium mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {userData.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                          
                          <h4 className="text-base font-medium mb-2">Awards & Honors</h4>
                          <div className="space-y-2">
                            {userData.awards.map(award => (
                              <div key={award.id} className="text-sm">
                                <p className="font-medium">{award.title}</p>
                                <p className="text-muted-foreground text-xs">
                                  {award.issuer} • {award.year}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Projects Tab */}
                <TabsContent value="projects">
                  <div className="flex items-center justify-center h-40 bg-muted rounded-lg">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">
                        No projects to display yet.
                      </p>
                      <Button>Add a Project</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
