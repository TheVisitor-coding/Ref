import { Clock, MoveHorizontal, Heart, Gauge, Zap, Menu } from 'lucide-react';
import { Control, Controller, UseFormRegister } from 'react-hook-form';
import RpeScale from './RpeScale';
import LayoutCard from '../card/LayoutCard';

interface SessionFormSectionProps {
    control: Control<any>;
    register: UseFormRegister<any>;
    disabled?: boolean;
}

const Row: React.FC<{ children: React.ReactNode; padding?: string }> = ({ children, padding }) => (
    <div className={`flex gap-6 ${padding}`}>{children}</div>
);

export default function SessionFormSection({
    control,
    register,
    disabled
}: SessionFormSectionProps) {
    return (
        <LayoutCard title="Séance">
            <Row padding='p-4'>
                <div className="flex items-center gap-2 w-full">
                    <label className='flex items-center gap-2 text-secondary w-[200px]'>
                        <Clock className="size-4" />
                        Durée
                    </label>
                    <input
                        type="text"
                        {...register('duration')}
                        disabled={disabled}
                        placeholder="Vide"
                        className="px-2 py-1 text-base text-primary placeholder:text-disabled bg-transparent border-none outline-none"
                    />
                </div>

                <Controller
                    name="rpe"
                    control={control}
                    render={({ field }) => (
                        <RpeScale
                            value={field.value}
                            onChange={field.onChange}
                            disabled={disabled}
                        />
                    )}
                />
            </Row>

            <Row padding='px-4 pb-4'>
                <div className="flex items-center gap-2 w-full">
                    <label className='flex items-center gap-2 text-secondary w-[200px]'>
                        <MoveHorizontal className="size-4" />
                        Distance
                    </label>
                    <input
                        type="text"
                        {...register('distance')}
                        disabled={disabled}
                        placeholder="Vide"
                        className="px-2 py-1 text-base text-primary placeholder:text-disabled bg-transparent border-none outline-none w-20"
                    />
                </div>

                <div className="flex items-center gap-2 w-full">
                    <label className='flex items-center gap-2 text-secondary w-[200px]'>
                        <Heart className="size-4" />
                        Fréquence cardiaque
                    </label>
                    <input
                        type="text"
                        {...register('heartRate')}
                        disabled={disabled}
                        placeholder="Vide"
                        className="px-2 py-1 text-base text-primary placeholder:text-disabled bg-transparent border-none outline-none w-20"
                    />
                </div>
            </Row>

            <Row padding='px-4 pb-4'>
                <div className="flex items-center gap-2 w-full">
                    <label className='flex items-center gap-2 text-secondary w-[200px]'>
                        <Gauge className="size-4" />
                        Vitesse
                    </label>
                    <input
                        type="text"
                        {...register('speed')}
                        disabled={disabled}
                        placeholder="Vide"
                        className="px-2 py-1 text-base text-primary placeholder:text-disabled bg-transparent border-none outline-none w-20"
                    />
                </div>

                <div className="flex items-center gap-2 w-full">
                    <label className='flex items-center gap-2 text-secondary w-[200px]'>
                        <Zap className="size-4" />
                        Puissance
                    </label>
                    <input
                        type="text"
                        {...register('power')}
                        disabled={disabled}
                        placeholder="Vide"
                        className="px-2 py-1 text-base text-primary placeholder:text-disabled bg-transparent border-none outline-none w-20"
                    />
                </div>
            </Row>

            <Row padding='px-4 pb-4'>
                <div className="flex items-start gap-2 w-full">
                    <label className='flex items-center gap-2 text-secondary w-[200px]'>
                        <Menu className="size-4" />
                        Corps de séance
                    </label>
                    <textarea
                        {...register('sessionBody')}
                        disabled={disabled}
                        placeholder="Vide"
                        className="flex-1 px-2 py-1 text-base text-primary placeholder:text-disabled bg-transparent border-none outline-none"
                    />
                </div>
            </Row>
        </LayoutCard>
    );
}
