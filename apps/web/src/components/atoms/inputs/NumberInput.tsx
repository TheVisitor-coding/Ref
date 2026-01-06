'use client';

import { ChevronsUpDown, Euro } from 'lucide-react';

interface NumberInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    placeholder?: string;
    required?: boolean;
    showIcon?: 'chevrons' | 'euro' | 'none';
    className?: string;
}

export default function NumberInput({
    label,
    value,
    onChange,
    placeholder = '0',
    required = false,
    showIcon = 'none',
    className = '',
}: NumberInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numValue = parseFloat(e.target.value) || 0;
        onChange(numValue);
    };

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label className="text-base text-primary font-normal leading-[1.25]">
                {label}
                {required && <span className="text-accent ml-0.5">*</span>}
            </label>
            <div className="relative">
                <input
                    type="number"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    step={showIcon === 'euro' ? '0.01' : '1'}
                    className="bg-white border border-grey-button rounded-lg h-12 px-4 py-3 text-sm text-primary placeholder:text-placeholder leading-[1.25] w-full pr-10"
                />
                {showIcon === 'chevrons' && (
                    <ChevronsUpDown className="absolute right-4 top-1/2 -translate-y-1/2 size-6 text-secondary pointer-events-none" />
                )}
                {showIcon === 'euro' && (
                    <Euro className="absolute right-4 top-1/2 -translate-y-1/2 size-6 text-secondary pointer-events-none" />
                )}
            </div>
        </div>
    );
}
