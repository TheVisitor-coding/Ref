const CHART_HEIGHT = 225;
const BORDER_COLOR = '#EC5849';
const BORDER_WIDTH = 3;
const POINT_RADIUS = 0;
const POINT_HOVER_RADIUS = 6;
const MAX_TICKS_LIMIT = 5;
const Y_AXIS_POSITION = 'left' as const;
const SHOW_GRID_LINES = false;
const Y_AXIS_UNIT = 'km';
const TENSION = 0.4;
const FILL = false;

export const PERFORMANCE_CHART_CONFIG = {
    height: CHART_HEIGHT,
    borderColor: BORDER_COLOR,
    borderWidth: BORDER_WIDTH,
    pointRadius: POINT_RADIUS,
    pointHoverRadius: POINT_HOVER_RADIUS,
    maxTicksLimit: MAX_TICKS_LIMIT,
    yAxisPosition: Y_AXIS_POSITION,
    showGridLines: SHOW_GRID_LINES,
    yAxisUnit: Y_AXIS_UNIT,
    tension: TENSION,
    fill: FILL,
    backgroundColor: 'rgba(236, 88, 73, 0.1)',
} as const;

export const PERIOD_LABELS = {
    week: ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.'],
    year: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
};

export const MOCK_DATA = {
    week: [55, 25, 35, 70, 45, 35, 15, 50],
    year: [400, 480, 520, 580, 620, 680, 700, 650, 620, 550, 500, 450],
};

export const PERIOD_OPTIONS = [
    { value: 'week', label: 'Par semaine' },
    { value: 'month', label: 'Par mois' },
    { value: 'year', label: 'Par année' },
];

export const METRIC_OPTIONS = [
    { value: 'distance', label: 'Distance' },
    { value: 'duration', label: 'Durée' },
    { value: 'elevation', label: 'Dénivelé' },
    { value: 'heartRate', label: 'FC moyenne' },
    { value: 'pace', label: 'Allure moyenne' },
];

export const formatTooltipValue = (value: number, metric: string = 'distance'): string => {
    switch (metric) {
        case 'distance':
            return `${value} km`;
        case 'duration':
            return `${value} min`;
        case 'elevation':
            return `${value} m`;
        case 'heartRate':
            return `${value} bpm`;
        case 'pace':
            return `${value} min/km`;
        default:
            return `${value}`;
    }
};

export const formatYAxisValue = (value: number): string => {
    return value.toString();
};

export const generateMonthLabels = (lastDay: number): string[] => {
    const labels: string[] = [];
    for (let d = 1; d <= lastDay; d++) {
        labels.push(d.toString());
    }
    return labels;
};

export const generateMockMonthData = (daysCount: number): number[] => {
    return Array.from({ length: daysCount }, () =>
        Math.floor(Math.random() * 60) + 15
    );
};
