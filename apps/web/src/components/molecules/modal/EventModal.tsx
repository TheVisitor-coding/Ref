'use client';

import { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { EventFormInput, EventFormSchema, getEventDefaultValues } from "@/schema/EventSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { CoachEvent } from "@/types/CoachEvent";
import {
    EventContextSection,
    EventDetailSection,
    EventDescriptionSection,
} from "@/components/molecules/form/EventFormSection";

interface EventModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode?: 'create' | 'edit' | 'view';
    initialData?: Partial<EventFormInput>;
    selectedDate?: Date;
}

const MODAL_CONFIG = {
    create: { title: 'Ajouter un évènement', submitLabel: 'Ajouter à l\'agenda' },
    edit: { title: 'Modifier l\'évènement', submitLabel: 'Enregistrer' },
    view: { title: 'Détails de l\'évènement', submitLabel: '' },
} as const;

export default function EventModal({
    open,
    onOpenChange,
    mode = 'create',
    initialData,
    selectedDate,
}: EventModalProps) {
    const queryClient = useQueryClient();
    const isReadOnly = mode === 'view';
    const config = MODAL_CONFIG[mode];

    const {
        register,
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        setFocus,
        formState: { errors, isSubmitting },
    } = useForm<EventFormInput>({
        resolver: zodResolver(EventFormSchema),
        defaultValues: getEventDefaultValues(initialData, selectedDate),
    });

    const isAllDay = watch('isAllDay');

    useEffect(() => {
        if (open) {
            reset(getEventDefaultValues(initialData, selectedDate));
            setTimeout(() => setFocus('title'), 100);
        }
    }, [open, initialData, selectedDate, reset, setFocus]);

    const mutation = useMutation({
        mutationFn: async (data: EventFormInput) => {
            const endpoint = '/api/events';
            const method = mode === 'edit' ? 'PUT' : 'POST';

            const response = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData?.error || 'Une erreur est survenue');
            }

            return response.json() as Promise<{ data: CoachEvent }>;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['coachEvents'] });
            toast.success(mode === 'create' ? 'Événement créé avec succès !' : 'Événement mis à jour !');
            handleClose();
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const handleClose = () => {
        reset();
        onOpenChange(false);
    };

    const handleAllDayChange = (checked: boolean) => {
        setValue('isAllDay', checked);
        if (checked) {
            setValue('startTime', '00:00');
            setValue('endTime', '23:59');
        } else {
            setValue('startTime', '10:00');
            setValue('endTime', '11:00');
        }
    };

    const onSubmit = (data: EventFormInput) => {
        mutation.mutate(data);
    };

    const isPending = mutation.isPending || isSubmitting;

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-[1200px] p-0 bg-white">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2 border-b border-grey-button mx-10 pt-10 pb-4">
                        <DialogTitle className="text-sm font-semibold text-primary">
                            {config.title}
                        </DialogTitle>
                        <div className="relative">
                            <input
                                type="text"
                                {...register('title')}
                                placeholder="Nom de l'évènement"
                                disabled={isReadOnly}
                                className="w-full text-[40px] font-poppins font-semibold leading-normal text-primary placeholder:text-disabled border-none outline-none bg-transparent"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-10 px-10 py-10 overflow-y-auto max-h-[calc(90vh-280px)]">
                        <EventContextSection
                            control={control}
                            register={register}
                            disabled={isReadOnly}
                            isAllDay={isAllDay ?? false}
                            onAllDayChange={handleAllDayChange}
                        />

                        <EventDetailSection
                            control={control}
                            disabled={isReadOnly}
                        />

                        <EventDescriptionSection
                            register={register}
                            disabled={isReadOnly}
                        />
                    </div>

                    <div className="flex items-center justify-between gap-6 px-10 py-6 border-t border-grey-button bg-white">
                        <SecondaryButton
                            label="Annuler"
                            onClick={handleClose}
                            type="button"
                        />
                        {!isReadOnly && (
                            <PrimaryButton
                                type="submit"
                                label={
                                    isPending ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            {mode === 'create' ? 'Création...' : 'Enregistrement...'}
                                        </span>
                                    ) : (
                                        config.submitLabel
                                    )
                                }
                                disabled={isPending}
                                className="py-3 px-6 shadow-button"
                            />
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
