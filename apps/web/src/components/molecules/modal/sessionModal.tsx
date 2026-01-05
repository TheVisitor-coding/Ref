'use client';

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import ProgramField from "@/components/atoms/form/ProgramField";
import SessionFormSection from "@/components/molecules/form/SessionFormSection";
import CommentSection from "@/components/molecules/form/CommentSection";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Session } from "@/types/Session";
import { toast } from "sonner";
import { SessionFormInput, SessionFormSchema } from "@/schema/SessionSchema";
import { formatDateToISO } from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

type AthleteOption = { value: string; label: string };

interface SessionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode?: 'create' | 'edit' | 'view';
    initialData?: Partial<SessionFormInput>;
    athleteId: number;
    athleteOptions?: AthleteOption[];
    selectedDate?: Date;
}

const getDefaultValues = (
    initialData?: Partial<SessionFormInput>,
    selectedDate?: Date
): SessionFormInput => ({
    documentId: initialData?.documentId,
    title: initialData?.title ?? '',
    sport: initialData?.sport ?? '',
    date: initialData?.date ?? formatDateToISO(selectedDate),
    tags: initialData?.tags ?? '',
    presenceRequired: initialData?.presenceRequired ?? false,
    duration: initialData?.duration ?? '',
    rpe: initialData?.rpe,
    distance: initialData?.distance ?? '',
    heartRate: initialData?.heartRate ?? '',
    speed: initialData?.speed ?? '',
    power: initialData?.power ?? '',
    sessionBody: initialData?.sessionBody ?? '',
    comment: initialData?.comment ?? '',
});

const MODAL_CONFIG = {
    create: { title: 'Ajouter une séance', submitLabel: 'Ajouter au planning' },
    edit: { title: 'Modifier la séance', submitLabel: 'Enregistrer' },
    view: { title: 'Détails de la séance', submitLabel: '' },
} as const;

export default function SessionModal({
    open,
    onOpenChange,
    mode = 'create',
    initialData,
    athleteId: initialAthleteId,
    athleteOptions = [],
    selectedDate,
}: SessionModalProps) {
    const queryClient = useQueryClient();
    const isReadOnly = mode === 'view';
    const config = MODAL_CONFIG[mode];

    const [selectedAthleteId, setSelectedAthleteId] = useState(initialAthleteId);
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<SessionFormInput>({
        resolver: zodResolver(SessionFormSchema),
        defaultValues: getDefaultValues(initialData, selectedDate),
    });

    useEffect(() => {
        if (open) {
            reset(getDefaultValues(initialData, selectedDate));
            setSelectedAthleteId(initialAthleteId);
        }
    }, [open, initialData, selectedDate, reset, initialAthleteId]);

    const mutation = useMutation({
        mutationFn: async (data: SessionFormInput) => {
            const endpoint = `/api/athletes/${selectedAthleteId}/sessions`;
            const method = mode === 'edit' ? 'PUT' : 'POST';

            console.log(data, 'Submitting to', endpoint, 'with method', method);

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

            return response.json() as Promise<{ data: Session }>;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['athleteSessions', selectedAthleteId] });
            toast.success(mode === 'create' ? 'Séance créée avec succès !' : 'Séance mise à jour !');
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

    const onSubmit = (data: SessionFormInput) => {
        mutation.mutate(data);
    };

    const isPending = mutation.isPending || isSubmitting;

    console.log(athleteOptions)

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
                                placeholder="Nom de la séance"
                                disabled={isReadOnly}
                                className="w-full text-[40px] font-poppins font-semibold leading-normal text-primary placeholder:text-disabled border-none outline-none bg-transparent"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-10 px-10 py-10 overflow-y-auto max-h-[calc(90vh-280px)]">
                        <section className="flex flex-col gap-4">
                            <h3 className="text-sm font-semibold text-primary">Contexte</h3>
                            <div className="flex gap-6 items-center flex-wrap">
                                <ProgramField
                                    icon="user"
                                    type="select"
                                    value={String(selectedAthleteId)}
                                    onChange={(val) => setSelectedAthleteId(Number(val))}
                                    options={athleteOptions}
                                    disabled={isReadOnly || athleteOptions.length <= 1}
                                />
                                <Controller
                                    name="sport"
                                    control={control}
                                    render={({ field }) => (
                                        <ProgramField
                                            icon="run"
                                            type="select"
                                            selectVariant="sport"
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabled={isReadOnly}
                                        />
                                    )}
                                />
                                <ProgramField
                                    icon="calendar"
                                    {...register('date')}
                                    type="date"
                                    placeholder="Date"
                                    disabled={isReadOnly}
                                />
                                <ProgramField
                                    icon="tag"
                                    {...register('tags')}
                                    placeholder="Tags (virgule)"
                                    disabled={isReadOnly}
                                />
                                <div className="flex-1 flex items-center justify-end gap-2 min-w-[200px]">
                                    <input
                                        type="checkbox"
                                        id="presenceRequired"
                                        {...register('presenceRequired')}
                                        disabled={isReadOnly}
                                        className="w-4 h-4 border border-border-input rounded cursor-pointer"
                                    />
                                    <label
                                        htmlFor="presenceRequired"
                                        className="text-base text-primary cursor-pointer select-none"
                                    >
                                        Ma présence est nécessaire
                                    </label>
                                </div>
                            </div>
                        </section>

                        <SessionFormSection
                            control={control}
                            register={register}
                            disabled={isReadOnly}
                        />

                        <CommentSection
                            {...register('comment')}
                            placeholder="Ajouter un commentaire..."
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
