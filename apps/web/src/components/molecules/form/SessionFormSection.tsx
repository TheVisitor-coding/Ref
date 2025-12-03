import { Clock, MoveHorizontal, Heart, Gauge, Zap, Menu } from 'lucide-react';
import RpeScale from './RpeScale';
import LayoutCard from '../card/LayoutCard';

interface SessionFormSectionProps {
    duration?: string;
    rpe?: number;
    distance?: string;
    heartRate?: string;
    speed?: string;
    power?: string;
    sessionBody?: string;
    onDurationChange?: (value: string) => void;
    onRpeChange?: (value: number) => void;
    onDistanceChange?: (value: string) => void;
    onHeartRateChange?: (value: string) => void;
    onSpeedChange?: (value: string) => void;
    onPowerChange?: (value: string) => void;
    onSessionBodyChange?: (value: string) => void;
    disabled?: boolean;
}

const Row: React.FC<{ children: React.ReactNode; padding?: string }> = ({ children, padding }) => (
    <div className={`flex gap-6 ${padding}`}>{children}</div>
);

export default function SessionFormSection({
    duration,
    rpe,
    distance,
    heartRate,
    speed,
    power,
    sessionBody,
    onDurationChange,
    onRpeChange,
    onDistanceChange,
    onHeartRateChange,
    onSpeedChange,
    onPowerChange,
    onSessionBodyChange,
    disabled
}: SessionFormSectionProps) {
    return (
        <LayoutCard title="Séance">
            <Row padding='p-4'>
                <div className="flex items-center gap-2 w-full">
                    <label className='flex items-center gap-2 text-secondary w-[200px]'>
                        <Clock className="size-4 " />
                        Durée
                    </label>
                    <input
                        type="text"
                        value={duration}
                        onChange={(e) => onDurationChange?.(e.target.value)}
                        disabled={disabled}
                        placeholder="00:00:00"
                        className="px-2 py-1 text-base text-primary placeholder:text-disabled bg-transparent border-none outline-none"
                    />
                </div>

                <RpeScale value={rpe} onChange={onRpeChange} disabled={disabled} />
            </Row>

            <Row padding='px-4 pb-4'>
                <div className="flex items-center gap-2 w-full">
                    <label className='flex items-center gap-2 text-secondary w-[200px]'>
                        <MoveHorizontal className="size-4 " />
                        Distance
                    </label>
                    <input
                        type="text"
                        value={distance}
                        onChange={(e) => onDistanceChange?.(e.target.value)}
                        disabled={disabled}
                        placeholder="0 km"
                        className="px-2 py-1 text-base text-primary placeholder:text-disabled bg-transparent border-none outline-none w-20"
                    />
                </div>

                <div className="flex items-center gap-2 w-full">
                    <label className='flex items-center gap-2 text-secondary w-[200px]'>
                        <Heart className="size-4 " />
                        Fréquence cardiaque
                    </label>
                    <input
                        type="text"
                        value={heartRate}
                        onChange={(e) => onHeartRateChange?.(e.target.value)}
                        disabled={disabled}
                        placeholder="0 bpm"
                        className="px-2 py-1 text-base text-primary placeholder:text-disabled bg-transparent border-none outline-none w-20"
                    />
                </div>
            </Row>

            <Row padding='px-4 pb-4'>
                <div className="flex items-center gap-2 w-full">
                    <label className='flex items-center gap-2 text-secondary w-[200px]'>
                        <Gauge className="size-4 " />
                        Vitesse
                    </label>
                    <input
                        type="text"
                        value={speed}
                        onChange={(e) => onSpeedChange?.(e.target.value)}
                        disabled={disabled}
                        placeholder="0 km/h"
                        className="px-2 py-1 text-base text-primary placeholder:text-disabled bg-transparent border-none outline-none w-20"
                    />
                </div>

                <div className="flex items-center gap-2 w-full">
                    <label className='flex items-center gap-2 text-secondary w-[200px]'>
                        <Zap className="size-4 " />
                        Puissance
                    </label>
                    <input
                        type="text"
                        value={power}
                        onChange={(e) => onPowerChange?.(e.target.value)}
                        disabled={disabled}
                        placeholder="0 W"
                        className="px-2 py-1 text-base text-primary placeholder:text-disabled bg-transparent border-none outline-none w-20"
                    />
                </div>
            </Row>

            <Row padding='px-4 pb-4'>
                <div className="flex items-start gap-2 w-full">
                    <label className='flex items-center gap-2 text-secondary w-[200px]'>
                        <Menu className="size-4 " />
                        Corps de séance
                    </label>
                    <textarea
                        value={sessionBody}
                        onChange={(e) => onSessionBodyChange?.(e.target.value)}
                        disabled={disabled}
                        placeholder="Saisir le corps de séance"
                        className="flex-1 px-2 py-1 text-base text-primary placeholder:text-disabled bg-transparent border-none outline-none"
                    />
                </div>
            </Row>
        </LayoutCard>
    );
}
