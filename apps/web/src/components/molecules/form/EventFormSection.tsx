'use client';

import { Control, Controller, UseFormRegister } from 'react-hook-form';
import ProgramField from '@/components/atoms/form/ProgramField';
import TimeInput from '@/components/atoms/form/TimeInput';
import ColorPalette from '@/components/atoms/form/ColorPalette';
import { EventFormInput } from '@/schema/EventSchema';
import { eventTypeOptions, eventColorOptions, recurrenceOptions } from '@/types/CoachEvent';
import { Clipboard, Calendar } from 'lucide-react';

const Row: React.FC<{ children: React.ReactNode; padding?: string }> = ({ children, padding }) => (
    <div className={`flex gap-6 ${padding}`}>{children}</div>
);

interface EventContextSectionProps {
    control: Control<EventFormInput>;
    register: UseFormRegister<EventFormInput>;
    disabled?: boolean;
    isAllDay: boolean;
    onAllDayChange: (checked: boolean) => void;
}

export function EventContextSection({
    control,
    register,
    disabled = false,
    isAllDay,
    onAllDayChange,
}: EventContextSectionProps) {
    return (
        <section className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-primary">Contexte</h3>
            <div className="flex gap-6 items-center flex-wrap">
                <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-secondary flex-shrink-0" />
                    <input
                        {...register('date')}
                        type="date"
                        disabled={disabled}
                        className="h-fit px-2 py-1 text-base text-primary placeholder:text-disabled bg-transparent hover:bg-[#EBEBEB] focus:bg-white focus:ring-1 focus:ring-primary-blue border-none outline-none rounded-lg transition-colors min-w-[120px] [&::-webkit-calendar-picker-indicator]:hidden"
                    />
                </div>

                {!isAllDay && (
                    <div className="flex items-center gap-2">
                        <Controller
                            name="startTime"
                            control={control}
                            render={({ field }) => (
                                <TimeInput
                                    name="startTime"
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                    placeholder="10:00"
                                    showIcon
                                />
                            )}
                        />
                        <span className="text-secondary">→</span>
                        <Controller
                            name="endTime"
                            control={control}
                            render={({ field }) => (
                                <TimeInput
                                    name="endTime"
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                    placeholder="11:00"
                                />
                            )}
                        />
                    </div>
                )}

                <ProgramField
                    icon="location"
                    {...register('location')}
                    type="text"
                    placeholder="Lieu"
                    disabled={disabled}
                />

                <Controller
                    name="recurrence"
                    control={control}
                    render={({ field }) => (
                        <div className="flex gap-2 items-center select--noarrow">
                            <ProgramField
                                icon="zap"
                                type="select"
                                value={field.value}
                                onChange={field.onChange}
                                disabled={disabled}
                                options={recurrenceOptions}
                            />
                        </div>
                    )}
                />

                <div className="flex-1 flex items-center justify-end gap-2 min-w-[200px]">
                    <input
                        type="checkbox"
                        id="isAllDay"
                        checked={isAllDay}
                        onChange={(e) => onAllDayChange(e.target.checked)}
                        disabled={disabled}
                        className="w-4 h-4 border border-border-input rounded-full cursor-pointer accent-primary-blue"
                    />
                    <label
                        htmlFor="isAllDay"
                        className="text-base text-primary cursor-pointer select-none"
                    >
                        Toute la journée
                    </label>
                </div>
            </div>
        </section>
    );
}

interface EventDetailSectionProps {
    control: Control<EventFormInput>;
    disabled?: boolean;
}

export function EventDetailSection({ control, disabled = false }: EventDetailSectionProps) {
    return (
        <div className="bg-white border border-grey-button rounded-2xl p-1">
            <div className="bg-[#F5F5F5] rounded-xl px-6 py-4">
                <h4 className="text-sm font-semibold text-primary">Détail</h4>
            </div>

            <div className="p-4 flex flex-col gap-4">
                <Row>
                    <Controller
                        name="eventType"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center gap-3 w-full">
                                <Clipboard className="w-[18px] h-[18px] text-secondary" />
                                <span className="text-base text-secondary pr-3">Type d&apos;évènement</span>
                                <ProgramField
                                    type="select"
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                    options={eventTypeOptions}
                                    placeholder="Type"
                                />
                            </div>
                        )}
                    />

                    <Controller
                        name="color"
                        control={control}
                        render={({ field }) => (
                            <ColorPalette
                                value={field.value || 'blue'}
                                onChange={field.onChange}
                                options={eventColorOptions}
                                disabled={disabled}
                            />
                        )}
                    />
                </Row>

                <div className="flex items-center gap-2">
                    <ProgramField
                        icon="user"
                        type="text"
                        placeholder="Ajouter des participants..."
                        disabled={disabled}
                    />
                </div>
            </div>
        </div>
    );
}

interface EventDescriptionSectionProps {
    register: UseFormRegister<EventFormInput>;
    disabled?: boolean;
}

export function EventDescriptionSection({ register, disabled = false }: EventDescriptionSectionProps) {
    return (
        <div className="bg-white border border-grey-button rounded-2xl p-1">
            <div className="bg-[#F5F5F5] rounded-xl px-6 py-4">
                <h4 className="text-sm font-semibold text-primary">Description</h4>
            </div>

            <div className="p-4">
                <textarea
                    {...register('description')}
                    placeholder="Aucune description"
                    disabled={disabled}
                    rows={3}
                    className="w-full px-3 py-2 text-base text-primary placeholder:text-disabled bg-transparent hover:bg-[#EBEBEB] focus:bg-white focus:ring-1 focus:ring-primary-blue border-none outline-none rounded-lg transition-colors resize-none"
                />
            </div>
        </div>
    );
}
