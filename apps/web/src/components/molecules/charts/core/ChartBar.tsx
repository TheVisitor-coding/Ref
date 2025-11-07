import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface ChartBarConfig {
    height?: number;
    barThickness?: number;
    barColor?: string;
    borderRadius?: number;
    maxTicksLimit?: number;
    yAxisPosition?: 'left' | 'right';
    showGridLines?: boolean;
    showLegend?: boolean;
    yAxisUnit?: string;
}

export interface ChartBarProps {
    labels: string[];
    data: number[];
    datasetLabel: string;
    config?: ChartBarConfig;
    formatTooltip?: (value: number) => string;
    formatYAxis?: (value: number) => string;
}

const DEFAULT_CONFIG: Required<ChartBarConfig> = {
    height: 270,
    barThickness: 32,
    barColor: '#EC5849',
    borderRadius: 4,
    maxTicksLimit: 3,
    yAxisPosition: 'right',
    showGridLines: true,
    showLegend: false,
    yAxisUnit: '',
};

const defaultFormatTooltip = (value: number): string => {
    if (value === null || value === undefined) return '';
    return `${value.toLocaleString('fr-FR')} €`;
};

const defaultFormatYAxis = (value: number): string => {
    return value >= 1000 ? `${value / 1000}k` : value.toString();
};

function ChartBar({
    labels,
    data,
    datasetLabel,
    config = {},
    formatTooltip = defaultFormatTooltip,
    formatYAxis = defaultFormatYAxis,
}: ChartBarProps) {
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: mergedConfig.showLegend,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context) => formatTooltip(context.parsed.y ?? 0),
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
                position: mergedConfig.yAxisPosition,
                grid: {
                    display: mergedConfig.showGridLines,
                    color: 'rgba(0, 0, 0, 0.1)',
                    drawTicks: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    maxTicksLimit: mergedConfig.maxTicksLimit,
                    callback: function (value, index) {
                        if (mergedConfig.yAxisUnit && index === 0) {
                            return formatYAxis(Number(value)) + ' ' + mergedConfig.yAxisUnit;
                        }
                        return formatYAxis(Number(value));
                    },
                },
            },
        },
    };

    const chartData = {
        labels,
        datasets: [
            {
                label: datasetLabel,
                data,
                backgroundColor: mergedConfig.barColor,
                borderColor: mergedConfig.barColor,
                borderWidth: 0,
                barThickness: mergedConfig.barThickness,
                borderRadius: mergedConfig.borderRadius,
            },
        ],
    };

    return (
        <div style={{ height: `${mergedConfig.height}px`, width: '100%' }}>
            <Bar options={options} data={chartData} />
        </div>
    );
}

export default ChartBar;
