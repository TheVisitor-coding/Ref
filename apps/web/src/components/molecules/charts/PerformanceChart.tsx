'use client';

import { useState } from 'react';
import ChartLine from './core/ChartLine';
import ChartFilters from './shared/ChartFilters';
import { useDateNavigation, PeriodType } from '@/hooks/useDateNavigation';
import {
    PERFORMANCE_CHART_CONFIG,
    PERIOD_LABELS,
    MOCK_DATA,
    PERIOD_OPTIONS,
    METRIC_OPTIONS,
    formatTooltipValue,
    formatYAxisValue,
    generateMonthLabels,
    generateMockMonthData,
} from '@/config/performanceChartConfig';

interface PerformanceChartProps {
    athleteId?: number;
}

function PerformanceChart({ }: PerformanceChartProps) {
    const [periodFilter, setPeriodFilter] = useState<PeriodType>('week');
    const [metricFilter, setMetricFilter] = useState<string>('distance');

    const { dateRange, periodDisplay, navigatePeriod, setPeriod } = useDateNavigation(
        periodFilter,
        PERIOD_LABELS.week,
        PERIOD_LABELS.year,
        generateMonthLabels
    );

    const handlePeriodChange = (value: string) => {
        const newPeriod = value as PeriodType;
        setPeriodFilter(newPeriod);
        setPeriod(newPeriod);
    };

    const getMockData = () => {
        if (periodFilter === 'week') {
            return MOCK_DATA.week;
        } else if (periodFilter === 'month') {
            return generateMockMonthData(dateRange.labels.length);
        } else {
            return MOCK_DATA.year;
        }
    };

    const chartData = getMockData();

    return (
        <div className="w-full flex flex-col gap-6">
            <ChartFilters
                periodFilter={periodFilter}
                periodOptions={PERIOD_OPTIONS}
                onPeriodChange={handlePeriodChange}
                secondaryFilter={metricFilter}
                secondaryOptions={METRIC_OPTIONS}
                secondaryLabel="Métriques"
                onSecondaryChange={setMetricFilter}
                periodDisplay={periodDisplay}
                onNavigatePrev={() => navigatePeriod('prev')}
                onNavigateNext={() => navigatePeriod('next')}
            />

            <div className="w-full flex flex-col gap-2">
                <ChartLine
                    labels={dateRange.labels}
                    data={chartData}
                    datasetLabel="Performance"
                    config={PERFORMANCE_CHART_CONFIG}
                    formatTooltip={(value) => formatTooltipValue(value, metricFilter)}
                    formatYAxis={formatYAxisValue}
                />
            </div>
        </div>
    );
}

export default PerformanceChart;