'use client';

import { Palette } from 'lucide-react';

export interface ColorOption {
    value: string;
    label: string;
    colorClass: string;
}

interface ColorPaletteProps {
    value: string;
    onChange: (value: string) => void;
    options: ColorOption[];
    disabled?: boolean;
    showLabel?: boolean;
    label?: string;
    showIcon?: boolean;
}

export default function ColorPalette({
    value,
    onChange,
    options,
    disabled = false,
    showLabel = true,
    label = 'Couleur',
    showIcon = true,
}: ColorPaletteProps) {
    return (
        <div className="flex items-center gap-3 w-full">
            {showIcon && <Palette className="w-[18px] h-[18px] text-secondary flex-shrink-0" />}
            {showLabel && <span className="text-base text-secondary">{label}</span>}
            <div className="flex items-center gap-2 ml-2">
                {options.map((color) => (
                    <button
                        key={color.value}
                        type="button"
                        onClick={() => !disabled && onChange(color.value)}
                        disabled={disabled}
                        className={`w-4 h-4 rounded-full transition-all ${color.colorClass} ${value === color.value ? 'ring-1 ring-offset-1 ring-primary-blue scale-110' : 'hover:scale-110'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        title={color.label}
                        aria-label={`Couleur ${color.label}`}
                        aria-pressed={value === color.value}
                    />
                ))}
            </div>
        </div>
    );
}
