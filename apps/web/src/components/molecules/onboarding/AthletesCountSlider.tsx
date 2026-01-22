'use client';

import { useState, useEffect, useRef } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

interface AthletesCountSliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

const SLIDER_LABELS = [
    { value: 1, label: '1' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
    { value: 40, label: '40+' },
];

export default function AthletesCountSlider({
    value,
    onChange,
    min = 1,
    max = 40,
}: AthletesCountSliderProps) {
    const [localValue, setLocalValue] = useState(value);
    const [isDragging, setIsDragging] = useState(false);
    const thumbRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleValueChange = (newValue: number[]) => {
        const val = newValue[0];
        setLocalValue(val);
        onChange(val);
    };

    const displayValue = localValue === 40 ? '40+' : localValue.toString();

    return (
        <div className="flex flex-col gap-2 py-10 w-full">
            <SliderPrimitive.Root
                className="relative flex w-full touch-none select-none items-center"
                value={[localValue]}
                onValueChange={handleValueChange}
                min={min}
                max={max}
                step={1}
                onPointerDown={() => setIsDragging(true)}
                onPointerUp={() => setIsDragging(false)}
            >
                <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-lg bg-[#f5f5f5]">
                    <SliderPrimitive.Range className="absolute h-full bg-primary-blue rounded-lg" />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb
                    ref={thumbRef}
                    className={cn(
                        'relative block size-5 rounded-full border-2 border-[#e6eeff] bg-primary-blue shadow-sm transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-0',
                        'disabled:pointer-events-none disabled:opacity-50',
                        'cursor-grab active:cursor-grabbing'
                    )}
                >
                    {/* Tooltip */}
                    <div
                        className={cn(
                            'absolute left-1/2 -translate-x-1/2 -top-10',
                            'bg-[#011133] text-white px-2 py-1 rounded-md',
                            'text-base font-normal whitespace-nowrap',
                            'transition-opacity duration-150',
                            isDragging || localValue > min ? 'opacity-100' : 'opacity-100'
                        )}
                    >
                        {displayValue}
                    </div>
                </SliderPrimitive.Thumb>
            </SliderPrimitive.Root>

            {/* Labels */}
            <div className="flex items-center justify-between w-full text-sm text-secondary font-normal">
                {SLIDER_LABELS.map((item) => (
                    <span key={item.value}>{item.label}</span>
                ))}
            </div>
        </div>
    );
}
