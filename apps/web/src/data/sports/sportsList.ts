export type SportType = keyof typeof sportConfig;

export const sportConfig = {
    running: {
        icon: '/sports/Run.svg',
        bgColor: 'bg-[#d2e9db]',
        textColor: 'text-[#00581a]',
        label: 'Course à pied',
    },
    cycling: {
        icon: '/sports/Bike.svg',
        bgColor: 'bg-[#eaddee]',
        textColor: 'text-[#764782]',
        label: 'Cyclisme',
    },
    swimming: {
        icon: '/sports/Swim.svg',
        bgColor: 'bg-[rgba(147,95,7,0.1)]',
        textColor: 'text-[#935f07]',
        label: 'Natation',
    },
} as const;

const sportAliases: Record<string, SportType> = {
    // Running
    'running': 'running',
    'run': 'running',
    'course': 'running',
    'course à pied': 'running',
    'jogging': 'running',
    'trail': 'running',
    'marathon': 'running',

    // Cycling
    'cycling': 'cycling',
    'bike': 'cycling',
    'vélo': 'cycling',
    'velo': 'cycling',
    'cyclisme': 'cycling',
    'vtt': 'cycling',

    // Swimming
    'swimming': 'swimming',
    'swim': 'swimming',
    'natation': 'swimming',
    'nage': 'swimming',
};

export function normalizeSportType(sport: string | null | undefined): SportType {
    if (!sport) return 'running';

    const normalized = sport.toLowerCase().trim();
    return sportAliases[normalized] ?? 'running';
}

export function getSportConfig(sport: string | null | undefined) {
    const sportType = normalizeSportType(sport);
    return sportConfig[sportType];
}

export function getSportOptions(): Array<{ value: SportType; label: string }> {
    return Object.entries(sportConfig).map(([value, config]) => ({
        value: value as SportType,
        label: config.label,
    }));
}