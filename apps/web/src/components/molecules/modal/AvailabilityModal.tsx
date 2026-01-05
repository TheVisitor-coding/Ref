'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';
import DayAvailability, { TimeSlot } from '@/components/molecules/inputs/DayAvailability';

interface DaySchedule {
    enabled: boolean;
    timeSlots: TimeSlot[];
}

interface WeekSchedule {
    [key: string]: DaySchedule;
}

interface AvailabilityModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const DAYS = [
    { key: 'monday', label: 'Lun.' },
    { key: 'tuesday', label: 'Mar.' },
    { key: 'wednesday', label: 'Mer.' },
    { key: 'thursday', label: 'Jeu.' },
    { key: 'friday', label: 'Ven.' },
    { key: 'saturday', label: 'Sam.' },
    { key: 'sunday', label: 'Dim.' },
];

const generateId = () => Math.random().toString(36).substring(2, 9);

const createDefaultTimeSlot = (): TimeSlot => ({
    id: generateId(),
    startTime: '09:00',
    endTime: '17:00',
});

const getDefaultSchedule = (): WeekSchedule => {
    const schedule: WeekSchedule = {};
    DAYS.forEach(({ key }) => {
        schedule[key] = {
            enabled: key !== 'saturday' && key !== 'sunday',
            timeSlots: [createDefaultTimeSlot()],
        };
    });
    return schedule;
};

export default function AvailabilityModal({ open, onOpenChange }: AvailabilityModalProps) {
    const [schedule, setSchedule] = useState<WeekSchedule>(getDefaultSchedule());

    useEffect(() => {
        if (open) {
            setSchedule(getDefaultSchedule());
        }
    }, [open]);

    const handleDayEnabledChange = (dayKey: string, enabled: boolean) => {
        setSchedule((prev) => ({
            ...prev,
            [dayKey]: {
                ...prev[dayKey],
                enabled,
                timeSlots: enabled && prev[dayKey].timeSlots.length === 0
                    ? [createDefaultTimeSlot()]
                    : prev[dayKey].timeSlots,
            },
        }));
    };

    const handleTimeSlotChange = (
        dayKey: string,
        slotId: string,
        field: 'startTime' | 'endTime',
        value: string
    ) => {
        setSchedule((prev) => ({
            ...prev,
            [dayKey]: {
                ...prev[dayKey],
                timeSlots: prev[dayKey].timeSlots.map((slot) =>
                    slot.id === slotId ? { ...slot, [field]: value } : slot
                ),
            },
        }));
    };

    const handleAddTimeSlot = (dayKey: string) => {
        setSchedule((prev) => ({
            ...prev,
            [dayKey]: {
                ...prev[dayKey],
                timeSlots: [...prev[dayKey].timeSlots, createDefaultTimeSlot()],
            },
        }));
    };

    const handleDeleteTimeSlot = (dayKey: string, slotId: string) => {
        setSchedule((prev) => ({
            ...prev,
            [dayKey]: {
                ...prev[dayKey],
                timeSlots: prev[dayKey].timeSlots.filter((slot) => slot.id !== slotId),
            },
        }));
    };

    const handleSave = () => {
        console.log('Saving schedule:', schedule);
        // TODO: Envoyer les données au backend
        onOpenChange(false);
    };

    const handleClose = () => {
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[600px] pt-10 px-10 gap-0 overflow-hidden bg-white">
                <div className="relative border-b border-grey-button pb-4 mb-6">
                    <p className="text-sm font-semibold text-primary mb-2">
                        Compléter mes plages horaires
                    </p>
                    <DialogTitle className="text-[40px] font-semibold text-primary leading-normal">
                        Disponibilités
                    </DialogTitle>
                </div>

                <div className="overflow-y-auto max-h-[500px]">
                    <div className="flex flex-col gap-4">
                        {DAYS.map(({ key, label }) => (
                            <DayAvailability
                                key={key}
                                day={label}
                                enabled={schedule[key].enabled}
                                timeSlots={schedule[key].timeSlots}
                                onEnabledChange={(enabled) =>
                                    handleDayEnabledChange(key, enabled)
                                }
                                onTimeSlotChange={(slotId, field, value) =>
                                    handleTimeSlotChange(key, slotId, field, value)
                                }
                                onAddTimeSlot={() => handleAddTimeSlot(key)}
                                onDeleteTimeSlot={(slotId) =>
                                    handleDeleteTimeSlot(key, slotId)
                                }
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-grey-button pt-4 mt-6 bg-white">
                    <SecondaryButton onClick={handleClose} label="Annuler" />
                    <PrimaryButton
                        onClick={handleSave}
                        label="Enregistrer mes horaires"
                        className="px-6 py-3 text-base shadow-button"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
