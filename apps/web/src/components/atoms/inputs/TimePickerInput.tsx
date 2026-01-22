'use client';

import { Clock } from 'lucide-react';
import { forwardRef } from 'react';

interface TimePickerInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

const TimePickerInput = forwardRef<HTMLInputElement, TimePickerInputProps>(
    ({ value, onChange, placeholder = '00 : 00', disabled = false }, ref) => {
        return (
            <div className="relative flex items-center gap-2 px-3 py-2 bg-white border border-grey-button rounded-lg min-w-[120px]">
                <input
                    ref={ref}
                    type="time"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    className="flex-1 text-sm text-primary outline-none bg-transparent [&::-webkit-calendar-picker-indicator]:hidden"
                    placeholder={placeholder}
                />
                <Clock className="size-5 text-secondary shrink-0" />
            </div>
        );
    }
);

TimePickerInput.displayName = 'TimePickerInput';

export default TimePickerInput;
