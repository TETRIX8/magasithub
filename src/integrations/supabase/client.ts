
export type LXPUser = {
  id: string;
  firstName: string;
  avatar: string;
  email: string;
  isLead: boolean;
  roles: string[];
  notificationsSettings?: {
    isPushDailyDigestOnEmail: boolean;
  };
  assignedSuborganizations?: {
    suborganization: {
      name: string;
    };
  }[];
  teacher?: {
    assignedDisciplines_V2: {
      discipline: {
        name: string;
        code: string;
        studyPeriods: {
          name: string;
          startDate: string;
          endDate: string;
        }[];
      };
    }[];
  };
};

export type LXPAuthResponse = {
  user: LXPUser;
  accessToken: string;
};

// Importing Supabase client
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://iwscnuhiwhsoorcwbgwz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3c2NudWhpd2hzb29yY3diZ3d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4OTk4MzcsImV4cCI6MjA1MDQ3NTgzN30.gM1XKGkgWS65GnL9T8mg2_yarvgqqLpQucbYbfAk1GI';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for publications
export type Publication = {
  id?: string;
  title: string;
  abstract: string;
  content: string;
  category: string;
  cover_image?: string | null;
  tags?: string[] | null;
  date?: string;
  author_id?: string;
  saved?: boolean;
  comments_count?: number;
};

export type PublicationAuthor = {
  id?: string;
  publication_id: string;
  name: string;
  role?: string;
  avatar_url?: string;
  user_id?: string;
};

// Publication CRUD operations
export const createPublication = async (publication: Publication) => {
  return await supabase
    .from('publications')
    .insert([publication])
    .select();
};

export const createPublicationAuthor = async (author: PublicationAuthor) => {
  return await supabase
    .from('publication_authors')
    .insert([author])
    .select();
};

export const getPublications = async () => {
  const { data, error } = await supabase
    .from('publications')
    .select(`
      *,
      publication_authors (*)
    `)
    .order('date', { ascending: false });
  
  return { data, error };
};

export const getPublicationById = async (id: string) => {
  return await supabase
    .from('publications')
    .select('*')
    .eq('id', id)
    .single();
};

export const getPublicationAuthors = async (publicationId: string) => {
  return await supabase
    .from('publication_authors')
    .select('*')
    .eq('publication_id', publicationId);
};

export const updatePublication = async (id: string, updates: Partial<Publication>) => {
  return await supabase
    .from('publications')
    .update(updates)
    .eq('id', id);
};

export const deletePublication = async (id: string) => {
  // First delete associated authors
  await supabase
    .from('publication_authors')
    .delete()
    .eq('publication_id', id);
  
  // Then delete the publication
  return await supabase
    .from('publications')
    .delete()
    .eq('id', id);
};
