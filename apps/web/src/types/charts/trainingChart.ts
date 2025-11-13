export type PeriodFilterType = 'week' | 'month' | 'year';

export type SportFilterType = 'all' | 'running' | 'cycling' | 'swimming' | 'triathlon';

export interface TrainingDayData {
    date: string;
    distance: number;
    duration: number;
    tss: number;
    sport: SportFilterType;
}

export interface TrainingWeekData {
    startDate: string;
    endDate: string;
    days: TrainingDayData[];
    stats: TrainingWeekStats;
}

export interface TrainingWeekStats {
    totalDistance: number;
    totalDuration: {
        hours: number;
        minutes: number;
    };
    averageTSS: number;
    weeklyVolume: number;
    volumeChange?: number;
}

export interface TrainingLoadChartData {
    labels: string[];
    data: number[];
    period: {
        start: string;
        end: string;
    };
    stats: TrainingWeekStats;
}

export interface TrainingLoadChartProps {
    athleteId?: number;
    initialPeriod?: PeriodFilterType;
    initialSport?: SportFilterType;
    data?: TrainingLoadChartData;
    onPeriodChange?: (period: PeriodFilterType) => void;
    onSportFilterChange?: (sport: SportFilterType) => void;
    onDateNavigate?: (direction: 'prev' | 'next') => void;
}
