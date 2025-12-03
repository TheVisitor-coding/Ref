import { sportConfig } from "@/data/sports/sportsList";

export type Session = {
    id: number;
    documentId: string;
    athleteId: number;
    coachId: number;
    date: string;
    title: string;
    sportType: keyof typeof sportConfig;
    durationMinutes: number | null;
    distanceKm: number | null;
    heartRateAvg: number | null;
    speedKmh: number | null;
    powerWatts: number | null;
    rpe: number | null;
    body: string | null;
    tags: string[];
    presenceRequired: boolean;
    status: 'draft' | 'planned' | 'done' | 'cancelled';
}