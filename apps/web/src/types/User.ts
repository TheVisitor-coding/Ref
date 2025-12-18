export interface User {
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
    role?: string;
}

export type AthleteLevel = 'beginner' | 'intermediate' | 'expert' | 'professional';

export interface Athlete extends User {
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
    discipline: string | undefined;
    mainObjective: string | null;
    secondaryObjective: string | null;
}

export interface CoachAthleteRelation {
    id?: number;
    documentId: string;
    notes?: string | null;
    status_relation?: 'pending' | 'active' | 'archived' | 'blocked';
}

export interface AthleteWithRelation extends Athlete {
    athlete_relations?: CoachAthleteRelation;
}