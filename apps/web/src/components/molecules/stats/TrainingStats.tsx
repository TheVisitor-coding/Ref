import StatBadge from '@/components/atoms/badge/StatBadge';
import { ChartNoAxesColumnIncreasing, Clock, Flame, MoveHorizontal } from 'lucide-react';

interface TrainingStatsProps {
    distance: number;
    duration: {
        hours: number;
        minutes: number;
    };
    tss: number;
    weeklyVolume: number;
    volumeChange?: number;
}

function TrainingStats({ distance, duration, tss, weeklyVolume, volumeChange }: TrainingStatsProps) {
    const formatDistance = (km: number) => (
        <>
            <span className="font-bold">{km} </span>km
        </>
    );

    const formatDuration = (hours: number, minutes: number) => (
        <>
            <span className="font-bold">{hours}</span>h <span className="font-bold">{minutes}</span>min
        </>
    );

    return (
        <div className="flex items-center justify-end gap-0 flex-wrap">
            <StatBadge
                icon={<MoveHorizontal color='#0655FF' />}
                value={formatDistance(distance)}
            />

            <StatBadge
                icon={<Clock color='#0655FF' />}
                value={formatDuration(duration.hours, duration.minutes)}
            />

            <StatBadge
                icon={<Flame color='#EC5849' />}
                label="TSS"
                value={tss}
            />

            <StatBadge
                icon={<ChartNoAxesColumnIncreasing color='#27AE60' />}
                label="Volume hebdo"
                value={`${weeklyVolume} km`}
                badge={volumeChange ? {
                    value: `${volumeChange > 0 ? '+' : ''}${volumeChange}%`,
                    variant: volumeChange > 0 ? 'positive' : volumeChange < 0 ? 'negative' : 'neutral'
                } : undefined}
            />
        </div>
    );
}

export default TrainingStats;
