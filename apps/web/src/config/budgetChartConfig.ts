import { ChartOptions } from 'chart.js';

const CHART_HEIGHT = 232;
const BAR_THICKNESS = 32;
const BAR_COLOR = '#EC5849';
const BORDER_RADIUS = 4;
const MAX_TICKS_LIMIT = 3;

export const BUDGET_CHART_CONFIG = {
    height: CHART_HEIGHT,
    barThickness: BAR_THICKNESS,
    barColor: BAR_COLOR,
    borderRadius: BORDER_RADIUS,
    maxTicksLimit: MAX_TICKS_LIMIT,
} as const;

const formatCurrencyValue = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return '';
    return `${value.toLocaleString('fr-FR')} €`;
};

const formatAxisValue = (value: number): string => {
    return value >= 1000 ? `${value / 1000}k` : value.toString();
};

export const getBudgetChartOptions = (): ChartOptions<'bar'> => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: true,
            callbacks: {
                label: (context) => formatCurrencyValue(context.parsed.y),
            },
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
        },
        y: {
            beginAtZero: true,
            position: 'right',
            grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)',
                drawTicks: false,
            },
            border: {
                display: false,
            },
            ticks: {
                maxTicksLimit: BUDGET_CHART_CONFIG.maxTicksLimit,
                callback: function (value) {
                    return formatAxisValue(Number(value));
                },
            },
        },
    },
});
