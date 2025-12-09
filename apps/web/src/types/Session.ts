import type { SportType } from '@/data/sports/sportsList';

export type SessionStatus =
    | 'draft'
    | 'scheduled'
    | 'confirmed'
    | 'in_progress'
    | 'completed'
    | 'cancelled'
    | 'conflict_pending';

export type SessionType =
    | 'training'
    | 'consultation'
    | 'personal'
    | 'reminder'
    | 'template';

export type IntensityLevel = 'low' | 'medium' | 'high' | 'very_high';

export type { SportType };

export interface Session {
    id: number;
    documentId: string;

    coach: { id: number } | number;
    athlete: { id: number } | number;

    name: string;
    sport: string | null;
    tags: string[] | null;
    description: string | null;
    objectives: string | null;
    session_body: string | null;
    coach_comment: string | null;

    start_datetime: string;
    end_datetime: string | null;
    location: string | null;
    session_type: SessionType;
    requires_presence: boolean;
    status: SessionStatus;

    intensity_level: IntensityLevel | null;
    expected_duration_minutes: number | null;
    difficulty_level: number | null;

    actual_duration_minutes: number | null;
    rpe: number | null;
    distance_km: number | null;
    heart_rate_avg: number | null;
    speed_kmh: number | null;
    power_watts: number | null;

    equipment_needed: string | null;
    preparation_notes: string | null;
    session_notes: string | null;
    athlete_feedback: string | null;
    coach_rating: number | null;
    athlete_rating: number | null;

    is_template: boolean;
    template_name: string | null;
    is_recurring: boolean;
    recurring_rule: Record<string, unknown> | null;

    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
}

export interface SessionDisplay {
    id: number;
    documentId: string;
    date: Date;
    title: string;
    sportType: SportType;
    duration: number | null;
    distance: number | null;
    heartRate: number | null;
    comment: string | null;
    status: SessionStatus;
    rpe: number | null;
}