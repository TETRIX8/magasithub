
import axios from 'axios';
import { LXPAuthResponse, LXPUser } from '@/integrations/supabase/client';

const API_URL = "https://api.newlxp.ru/graphql";

// LXP authentication service
export const lxpAuth = {
  // Sign in to LXP API
  signIn: async (email: string, password: string): Promise<string> => {
    const query = `
    query SignIn($input: SignInInput!) {
      signIn(input: $input) {
        user {
          id
          isLead
          __typename
        }
        accessToken
        __typename
      }
    }
    `;
    
    const variables = {
      input: {
        email,
        password
      }
    };
    
    try {
      const response = await axios.post(API_URL, { 
        operationName: "SignIn",
        query, 
        variables 
      }, {
        headers: {
          "Content-Type": "application/json",
          "apollographql-client-name": "web"
        }
      });
      
      const result = response.data.data;
      
      if (result && result.signIn && result.signIn.accessToken) {
        // Store token in localStorage
        localStorage.setItem('lxp_token', result.signIn.accessToken);
        return result.signIn.accessToken;
      } else {
        throw new Error('Failed to authenticate');
      }
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  },

  // Get user data from LXP API
  getUserData: async (token?: string): Promise<LXPUser> => {
    const authToken = token || localStorage.getItem('lxp_token');
    
    if (!authToken) {
      throw new Error('No authentication token found');
    }
    
    const query = `
    query GetMe {
      getMe {
        avatar
        createdAt
        email
        firstName
        id
        isLead
        roles
        phoneNumber
        legalDocumentsApprovedAt
        notificationsSettings {
          isPushDailyDigestOnEmail
          __typename
        }
        assignedSuborganizations {
          suborganization {
            name
            __typename
          }
          __typename
        }
        teacher {
          assignedDisciplines_V2 {
            discipline {
              name
              code
              studyPeriods {
                name
                startDate
                endDate
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
    }
    `;
    
    const headers = { 
      "Authorization": `Bearer ${authToken}`,
      "Content-Type": "application/json",
      "apollographql-client-name": "web"
    };
    
    try {
      const response = await axios.post(API_URL, { 
        operationName: "GetMe",
        query 
      }, { headers });
      return response.data.data.getMe;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },
  
  // Get student diary data
  getStudentDiary: async (studentId: string, token?: string) => {
    const authToken = token || localStorage.getItem('lxp_token');
    
    if (!authToken) {
      throw new Error('No authentication token found');
    }
    
    const diaryQuery = `
    query DiaryQuery($studentId: UUID!) {
      searchStudentDisciplines(input: { studentId: $studentId }) {
        discipline {
          name
          code
          teachers {
            user {
              lastName
              firstName
              middleName
            }
          }
        }
        disciplineGrade
        maxScoreForAnsweredTasks
        scoreForAnsweredTasks
        disciplineAttendance {
          percent
          total
          visited
        }
      }
    }`;
    
    const headers = { 
      "Authorization": `Bearer ${authToken}`,
      "Content-Type": "application/json",
      "apollographql-client-name": "web"
    };
    
    try {
      const response = await axios.post(API_URL, {
        operationName: "DiaryQuery",
        query: diaryQuery,
        variables: { studentId }
      }, { headers });
      
      return response.data.data.searchStudentDisciplines;
    } catch (error) {
      console.error("Error fetching student diary:", error);
      throw error;
    }
  },
  
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('lxp_token');
  },
  
  // Log out
  signOut: (): void => {
    localStorage.removeItem('lxp_token');
  }
};
