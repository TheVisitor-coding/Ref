'use client';

import TimePickerInput from '@/components/atoms/inputs/TimePickerInput';
import { Plus, Trash2 } from 'lucide-react';

interface TimeRangePickerProps {
    startTime: string;
    endTime: string;
    onStartTimeChange: (value: string) => void;
    onEndTimeChange: (value: string) => void;
    onAdd?: () => void;
    onDelete?: () => void;
    disabled?: boolean;
}

export default function TimeRangePicker({
    startTime,
    endTime,
    onStartTimeChange,
    onEndTimeChange,
    onAdd,
    onDelete,
    disabled = false,
}: TimeRangePickerProps) {
    return (
        <div className="flex items-center gap-4 w-full">
            <TimePickerInput
                value={startTime}
                onChange={onStartTimeChange}
                disabled={disabled}
            />
            <span className="text-sm text-primary">-</span>
            <TimePickerInput
                value={endTime}
                onChange={onEndTimeChange}
                disabled={disabled}
            />
            <div className="flex items-center gap-1">
                {onAdd && (
                    <button
                        type="button"
                        onClick={onAdd}
                        disabled={disabled}
                        className="p-2 border border-grey-button rounded-lg hover:bg-grey-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Plus className="size-5 text-primary" />
                    </button>
                )}
                <button
                    type="button"
                    onClick={onDelete}
                    disabled={disabled || !onDelete}
                    className={`p-2 border border-grey-button rounded-lg hover:bg-grey-light transition-colors disabled:opacity-50 ${!onDelete ? '!opacity-0' : ''}`}
                >
                    <Trash2 className="size-5 text-primary" />
                </button>
            </div>
        </div>
    );
}
