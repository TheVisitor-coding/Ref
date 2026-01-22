'use client';

import { Switch } from '@/components/ui/switch';
import TimeRangePicker from './TimeRangePicker';

export interface TimeSlot {
    id: string;
    startTime: string;
    endTime: string;
}

interface DayAvailabilityProps {
    day: string;
    enabled: boolean;
    timeSlots: TimeSlot[];
    onEnabledChange: (enabled: boolean) => void;
    onTimeSlotChange: (slotId: string, field: 'startTime' | 'endTime', value: string) => void;
    onAddTimeSlot: () => void;
    onDeleteTimeSlot: (slotId: string) => void;
}

export default function DayAvailability({
    day,
    enabled,
    timeSlots,
    onEnabledChange,
    onTimeSlotChange,
    onAddTimeSlot,
    onDeleteTimeSlot,
}: DayAvailabilityProps) {
    return (
        <div className="flex items-start justify-between w-full gap-4">
            <div className="flex items-center gap-4 min-w-[109px]">
                <Switch
                    checked={enabled}
                    onCheckedChange={onEnabledChange}
                    className="data-[state=checked]:bg-primary-blue data-[state=unchecked]:bg-grey-light"
                />
                <p className="text-base text-black font-normal">{day}</p>
            </div>

            {enabled && timeSlots.length > 0 && (
                <div className="flex flex-col gap-2">
                    {timeSlots.map((slot, index) => (
                        <TimeRangePicker
                            key={slot.id}
                            startTime={slot.startTime}
                            endTime={slot.endTime}
                            onStartTimeChange={(value) =>
                                onTimeSlotChange(slot.id, 'startTime', value)
                            }
                            onEndTimeChange={(value) =>
                                onTimeSlotChange(slot.id, 'endTime', value)
                            }
                            onAdd={index === timeSlots.length - 1 ? onAddTimeSlot : undefined}
                            onDelete={timeSlots.length > 1 ? () => onDeleteTimeSlot(slot.id) : undefined}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
