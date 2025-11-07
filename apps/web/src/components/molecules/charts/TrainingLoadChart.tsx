'use client';

import { useState } from 'react';
import TrainingStats from '@/components/molecules/stats/TrainingStats';
import ChartBar from './core/ChartBar';
import ChartFilters from './shared/ChartFilters';
import { useDateNavigation, PeriodType } from '@/hooks/useDateNavigation';
import {
    TRAINING_CHART_CONFIG,
    PERIOD_LABELS,
    MOCK_DATA,
    formatTooltipValue,
    formatYAxisValue,
    generateMonthLabels,
    generateMockMonthData,
} from '@/config/trainingChartConfig';

type SportType = 'all' | 'running' | 'cycling' | 'swimming' | 'triathlon';

interface TrainingLoadChartProps {
    athleteId?: number;
}

const PERIOD_OPTIONS = [
    { value: 'week', label: 'Par semaine' },
    { value: 'month', label: 'Par mois' },
    { value: 'year', label: 'Par année' },
];

const SPORT_OPTIONS = [
    { value: 'all', label: 'Par sport' },
    { value: 'running', label: 'Course à pied' },
    { value: 'cycling', label: 'Vélo' },
    { value: 'swimming', label: 'Natation' },
    { value: 'triathlon', label: 'Triathlon' },
];

function TrainingLoadChart({ }: TrainingLoadChartProps) {
    const [periodFilter, setPeriodFilter] = useState<PeriodType>('week');
    const [sportFilter, setSportFilter] = useState<SportType>('all');

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
                secondaryFilter={sportFilter}
                secondaryOptions={SPORT_OPTIONS}
                secondaryLabel="Par sport"
                onSecondaryChange={(value) => setSportFilter(value as SportType)}
                periodDisplay={periodDisplay}
                onNavigatePrev={() => navigatePeriod('prev')}
                onNavigateNext={() => navigatePeriod('next')}
            />

            <div className="w-full flex flex-col gap-2">
                <ChartBar
                    labels={dateRange.labels}
                    data={chartData}
                    datasetLabel="Distance"
                    config={TRAINING_CHART_CONFIG}
                    formatTooltip={formatTooltipValue}
                    formatYAxis={formatYAxisValue}
                />
            </div>

            <TrainingStats
                distance={80}
                duration={{ hours: 6, minutes: 43 }}
                tss={68}
                weeklyVolume={27}
                volumeChange={5}
            />
        </div>
    );
}

export default TrainingLoadChart;
