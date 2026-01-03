'use client';

import { forwardRef, useState, useEffect, useCallback, KeyboardEvent, ChangeEvent } from 'react';
import { Clock } from 'lucide-react';

interface TimeInputProps {
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    placeholder?: string;
    showIcon?: boolean;
    className?: string;
    name?: string;
}

const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
    ({ value = '', onChange, disabled = false, placeholder = '10:00', showIcon = false, className = '', name }, ref) => {
        const [hours, setHours] = useState('');
        const [minutes, setMinutes] = useState('');

        useEffect(() => {
            if (value && value.includes(':')) {
                const [h, m] = value.split(':');
                setHours(h || '');
                setMinutes(m || '');
            }
        }, [value]);

        const formatAndEmit = useCallback((h: string, m: string) => {
            const formattedHours = h.padStart(2, '0');
            const formattedMinutes = m.padStart(2, '0');
            onChange?.(`${formattedHours}:${formattedMinutes}`);
        }, [onChange]);

        const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 2);
            const numVal = parseInt(val, 10);

            if (val === '' || (numVal >= 0 && numVal <= 23)) {
                setHours(val);
                if (val.length === 2) {
                    document.getElementById(`${name}-minutes`)?.focus();
                }
            }
        };

        const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 2);
            const numVal = parseInt(val, 10);

            if (val === '' || (numVal >= 0 && numVal <= 59)) {
                setMinutes(val);
            }
        };

        const handleHoursBlur = () => {
            if (hours) {
                const padded = hours.padStart(2, '0');
                setHours(padded);
                formatAndEmit(padded, minutes || '00');
            }
        };

        const handleMinutesBlur = () => {
            if (minutes) {
                const padded = minutes.padStart(2, '0');
                setMinutes(padded);
                formatAndEmit(hours || '00', padded);
            } else if (hours) {
                setMinutes('00');
                formatAndEmit(hours, '00');
            }
        };

        const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, field: 'hours' | 'minutes') => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
                const delta = e.key === 'ArrowUp' ? 1 : -1;

                if (field === 'hours') {
                    const current = parseInt(hours || '0', 10);
                    const newVal = Math.max(0, Math.min(23, current + delta));
                    const padded = newVal.toString().padStart(2, '0');
                    setHours(padded);
                    formatAndEmit(padded, minutes || '00');
                } else {
                    const current = parseInt(minutes || '0', 10);
                    const newVal = Math.max(0, Math.min(59, current + delta));
                    const padded = newVal.toString().padStart(2, '0');
                    setMinutes(padded);
                    formatAndEmit(hours || '00', padded);
                }
            }

            if (e.key === ':' && field === 'hours') {
                e.preventDefault();
                document.getElementById(`${name}-minutes`)?.focus();
            }

            if (e.key === 'Backspace' && field === 'minutes' && !minutes) {
                document.getElementById(`${name}-hours`)?.focus();
            }
        };

        const inputClass = 'w-6 text-center bg-transparent outline-none text-base text-primary placeholder:text-disabled';
        const containerClass = `flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#EBEBEB] focus-within:bg-white focus-within:ring-1 focus-within:ring-primary-blue'}`;

        return (
            <div className={`flex items-center gap-2 ${className}`}>
                {showIcon && <Clock className="size-4 text-secondary flex-shrink-0" />}
                <div className={containerClass}>
                    <input
                        ref={ref}
                        id={`${name}-hours`}
                        type="text"
                        inputMode="numeric"
                        value={hours}
                        onChange={handleHoursChange}
                        onBlur={handleHoursBlur}
                        onKeyDown={(e) => handleKeyDown(e, 'hours')}
                        placeholder={placeholder.split(':')[0] || '10'}
                        disabled={disabled}
                        className={inputClass}
                        maxLength={2}
                        aria-label="Heures"
                    />
                    <span className="text-secondary select-none">:</span>
                    <input
                        id={`${name}-minutes`}
                        type="text"
                        inputMode="numeric"
                        value={minutes}
                        onChange={handleMinutesChange}
                        onBlur={handleMinutesBlur}
                        onKeyDown={(e) => handleKeyDown(e, 'minutes')}
                        placeholder={placeholder.split(':')[1] || '00'}
                        disabled={disabled}
                        className={inputClass}
                        maxLength={2}
                        aria-label="Minutes"
                    />
                </div>
            </div>
        );
    }
);

TimeInput.displayName = 'TimeInput';

export default TimeInput;
