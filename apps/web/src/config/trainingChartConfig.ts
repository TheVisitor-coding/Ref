const CHART_HEIGHT = 270;
const BAR_THICKNESS = 42;
const BAR_COLOR = '#EC5849';
const BORDER_RADIUS = 8;
const MAX_TICKS_LIMIT = 5;
const Y_AXIS_POSITION = 'left' as const;
const SHOW_GRID_LINES = false;
const Y_AXIS_UNIT = 'km';

export const TRAINING_CHART_CONFIG = {
    height: CHART_HEIGHT,
    barThickness: BAR_THICKNESS,
    barColor: BAR_COLOR,
    borderRadius: BORDER_RADIUS,
    maxTicksLimit: MAX_TICKS_LIMIT,
    yAxisPosition: Y_AXIS_POSITION,
    showGridLines: SHOW_GRID_LINES,
    showLegend: false,
    yAxisUnit: Y_AXIS_UNIT,
} as const;

export const PERIOD_LABELS = {
    week: ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.'],
    year: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
};

export const MOCK_DATA = {
    week: [60, 40, 30, 58, 25, 50, 72],
    year: [450, 520, 480, 600, 650, 700, 720, 690, 650, 580, 520, 480],
};

export const formatTooltipValue = (value: number): string => {
    return `${value} km`;
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
        Math.floor(Math.random() * 80) + 20
    );
};
