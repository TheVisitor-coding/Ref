'use client';

import { forwardRef } from 'react';
import {
    Select as UISelect,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';

type Option = { label: string; value: string };

type Props = {
    label: string;
    value?: string;
    onChange?: (val: string) => void;
    placeholder?: string;
    required?: boolean;
    error?: string;
    className?: string;
    options: Option[];
    disabled?: boolean;
};

const SelectField = forwardRef<HTMLButtonElement, Props>(function SelectField(
    { label, value, onChange, placeholder, required, error, className = '', options, disabled },
    ref
) {
    return (
        <div className={`w-full flex flex-col gap-2 ${className}`}>
            <label className="text-primary">
                {label}{required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <UISelect value={value} onValueChange={onChange} disabled={disabled}>
                <SelectTrigger
                    ref={ref}
                    className={`w-full h-12 rounded-md ${error ? 'border-red-500' : 'border-border-input'} text-primary px-4 text-sm`}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                    {options.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </UISelect>

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
});

export default SelectField;
