import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    Filler,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export interface ChartLineConfig {
    height?: number;
    borderColor?: string;
    borderWidth?: number;
    pointRadius?: number;
    pointHoverRadius?: number;
    showGridLines?: boolean;
    yAxisUnit?: string;
    yAxisPosition?: 'left' | 'right';
    maxTicksLimit?: number;
    tension?: number;
    fill?: boolean;
    backgroundColor?: string;
}

export interface ChartLineProps {
    labels: string[];
    data: number[];
    datasetLabel: string;
    config?: ChartLineConfig;
    formatTooltip?: (value: number) => string;
    formatYAxis?: (value: number) => string;
}

const DEFAULT_CONFIG: Required<ChartLineConfig> = {
    height: 225,
    borderColor: '#EC5849',
    borderWidth: 3,
    pointRadius: 0,
    pointHoverRadius: 6,
    showGridLines: false,
    yAxisUnit: 'km',
    yAxisPosition: 'left',
    maxTicksLimit: 5,
    tension: 0.4,
    fill: false,
    backgroundColor: 'rgba(236, 88, 73, 0.1)',
};

const defaultFormatTooltip = (value: number): string => {
    return `${value} km`;
};

const defaultFormatYAxis = (value: number): string => {
    return value.toString();
};

function ChartLine({
    config = {},
    labels,
    data,
    datasetLabel,
    formatTooltip = defaultFormatTooltip,
    formatYAxis = defaultFormatYAxis,
}: ChartLineProps) {
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
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
                borderColor: mergedConfig.borderColor,
                backgroundColor: mergedConfig.backgroundColor,
                borderWidth: mergedConfig.borderWidth,
                pointRadius: mergedConfig.pointRadius,
                pointHoverRadius: mergedConfig.pointHoverRadius,
                tension: mergedConfig.tension,
                fill: mergedConfig.fill,
            },
        ],
    };

    return (
        <div style={{ height: `${mergedConfig.height}px`, width: '100%' }}>
            <Line options={options} data={chartData} />
        </div>
    );
}

export default ChartLine;