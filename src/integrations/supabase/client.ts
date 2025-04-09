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
