'use client';

import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DateInputProps {
    label: string;
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
}

export default function DateInput({
    label,
    value,
    onChange,
    placeholder = 'XX/XX/XXXX',
    required = false,
    className = '',
}: DateInputProps) {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label className="text-base text-primary font-normal leading-[1.25]">
                {label}
                {required && <span className="text-accent ml-0.5">*</span>}
            </label>
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className="bg-white border border-grey-button rounded-lg h-12 px-4 py-3 flex items-center justify-between gap-2 text-left"
                    >
                        <span className={`text-sm leading-[1.25] ${value ? 'text-primary' : 'text-placeholder'}`}>
                            {value ? format(value, 'dd/MM/yyyy', { locale: fr }) : placeholder}
                        </span>
                        <CalendarIcon className="size-6 text-secondary" />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value}
                        onSelect={onChange}
                        initialFocus
                        locale={fr}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
