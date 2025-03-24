
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookText, GraduationCap, Users, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectCard, { ProjectCardProps } from '@/components/ui/ProjectCard';

// Sample data for featured publications
const featuredPublications: ProjectCardProps[] = [
  {
    id: '1',
    title: 'Machine Learning Approaches for Predictive Analytics in Higher Education',
    abstract: 'This research explores how machine learning algorithms can be applied to predict student performance and improve educational outcomes in college settings.',
    coverImage: 'https://images.unsplash.com/photo-1581092921461-eab62e97a2d5?q=80&w=2070&auto=format&fit=crop',
    date: 'May 15, 2023',
    category: 'Computer Science',
    authors: [
      { id: '1', name: 'Alex Johnson', role: 'Professor', avatarUrl: 'https://i.pravatar.cc/150?img=11' },
      { id: '2', name: 'Maria Garcia', role: 'Student', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
      { id: '3', name: 'David Kim', role: 'Researcher', avatarUrl: 'https://i.pravatar.cc/150?img=8' },
    ],
    commentsCount: 12,
    tags: ['Machine Learning', 'Education', 'Data Science'],
    saved: true,
  },
  {
    id: '2',
    title: 'The Impact of Climate Change on Urban Architecture: New Sustainable Design Principles',
    abstract: 'An analysis of how climate change is forcing architects to reconsider traditional design principles and adopt more sustainable approaches.',
    coverImage: 'https://images.unsplash.com/photo-1518005068251-37900150dfca?q=80&w=2071&auto=format&fit=crop',
    date: 'April 3, 2023',
    category: 'Architecture',
    authors: [
      { id: '4', name: 'Sarah Chen', role: 'Professor', avatarUrl: 'https://i.pravatar.cc/150?img=20' },
      { id: '5', name: 'Jamal Wilson', role: 'Student', avatarUrl: 'https://i.pravatar.cc/150?img=12' },
    ],
    commentsCount: 8,
    tags: ['Sustainability', 'Architecture', 'Climate Change'],
    saved: false,
  },
  {
    id: '3',
    title: 'Quantum Computing: Practical Applications in Cryptography and Database Systems',
    abstract: 'This paper examines the potential real-world applications of quantum computing in the fields of cryptography and database management.',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
    date: 'June 21, 2023',
    category: 'Physics',
    authors: [
      { id: '6', name: 'Robert Smith', role: 'Professor', avatarUrl: 'https://i.pravatar.cc/150?img=15' },
      { id: '7', name: 'Emma Parker', role: 'Researcher', avatarUrl: 'https://i.pravatar.cc/150?img=23' },
      { id: '8', name: 'Michael Johnson', role: 'Student', avatarUrl: 'https://i.pravatar.cc/150?img=30' },
      { id: '9', name: 'Lisa Wong', role: 'Student', avatarUrl: 'https://i.pravatar.cc/150?img=32' },
    ],
    commentsCount: 15,
    tags: ['Quantum Computing', 'Cryptography', 'Computer Science'],
    saved: false,
  },
];

const Index = () => {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-white py-16 sm:py-24">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[10%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0,rgba(59,130,246,0)_50%)]"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-slide-in">
                <div>
                  <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600 mb-6">
                    <span className="font-medium">Academic Social Network</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-foreground">
                    Share knowledge, <span className="text-primary">discover</span> research
                  </h1>
                  <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                    MagasitHub connects students and faculty in a collaborative academic environment. 
                    Share your research, discover new projects, and build your professional network.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link to="/dashboard">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/publications">
                      Browse Publications
                    </Link>
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                  <div className="flex flex-col">
                    <div className="font-display text-2xl font-bold">2.5K+</div>
                    <div className="text-sm text-muted-foreground">Publications</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-display text-2xl font-bold">500+</div>
                    <div className="text-sm text-muted-foreground">Researchers</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-display text-2xl font-bold">50+</div>
                    <div className="text-sm text-muted-foreground">Research Fields</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-display text-2xl font-bold">100%</div>
                    <div className="text-sm text-muted-foreground">Academic Focus</div>
                  </div>
                </div>
              </div>
              
              <div className="relative animate-blur-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-elevation">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                    alt="Students collaborating on research"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="text-white font-display text-xl font-semibold">
                      Connect. Collaborate. Innovate.
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 rounded-xl bg-white p-4 shadow-subtle">
                  <div className="flex items-center gap-2">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Academic Focus</div>
                      <div className="text-xs text-muted-foreground">Strictly moderated content</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl font-display font-bold">
                Everything you need for academic networking
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                MagasitHub provides all the tools you need to share your research, collaborate with peers, and build your academic profile.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-subtle hover-lift">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <BookText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">Research Publishing</h3>
                <p className="text-muted-foreground">
                  Share your academic work with the community. Publish papers, case studies, and research findings.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-subtle hover-lift">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">Academic Networking</h3>
                <p className="text-muted-foreground">
                  Connect with fellow students, professors, and researchers. Build professional relationships.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-subtle hover-lift">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">Events & Discussions</h3>
                <p className="text-muted-foreground">
                  Stay updated with academic events and engage in meaningful discussions about research topics.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Publications */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-display font-bold">Featured Publications</h2>
                <p className="mt-3 text-lg text-muted-foreground">
                  Explore the latest research from our academic community
                </p>
              </div>
              <Button variant="ghost" asChild className="mt-4 md:mt-0">
                <Link to="/publications">
                  View all publications <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPublications.map((publication) => (
                <ProjectCard key={publication.id} {...publication} />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-500 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display font-bold text-white mb-6">
                Ready to join the academic community?
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                Create your profile today and start sharing your research with peers and faculty.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
