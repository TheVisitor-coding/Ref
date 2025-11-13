export type User = {
    id: number;
    documentId: string;
    username: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    company_name: string | null;
    phone: string | null;
    language: string;
    country: string;
    statusUser: string;
    lastPredashboardSeenAt?: string | null;
};

export type AuthStoreType = {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    logout: () => void;
};

export type AthleteLevel = "beginner" | "intermediate" | "expert" | "professional";

export type Athlete = User & {
    avatar: {
        url: string;
    };
    tag: string;
    birth_date: string | null;
    height: number | null;
    weight: number | null;
    age: number | null;
    profession: string | null;
    level: AthleteLevel | undefined;
    createdAt: string | null;
    objective: string | null;
    statusUser: string | null;
    discipline: string | undefined;
    mainObjective: string | null;
    secondaryObjective: string | null;
}

export type CoachAthleteRelation = {
    id?: number;
    documentId: string;
    notes?: string | null;
    status_relation?: 'pending' | 'active' | 'archived' | 'blocked';
};

export type AthleteWithRelation = Athlete & { athlete_relations?: CoachAthleteRelation };