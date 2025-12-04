'use client';

import { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import ProgramField from "@/components/atoms/form/ProgramField";
import SessionFormSection from "@/components/molecules/form/SessionFormSection";
import CommentSection from "@/components/molecules/form/CommentSection";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Session } from "@/types/Session";
import { toast } from "sonner";
import { SessionFormInput, SessionFormSchema } from "@/schema/SessionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

interface SessionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode?: 'create' | 'edit' | 'view';
    initialData?: Partial<SessionFormInput>;
    athleteId: number;
    athleteName?: string;
    selectedDate?: Date;
}

const formatDateForInput = (date?: Date): string => {
    if (!date) return new Date().toISOString().split('T')[0];
    return date.toISOString().split('T')[0];
};

const getDefaultValues = (
    initialData?: Partial<SessionFormInput>,
    selectedDate?: Date
): SessionFormInput => ({
    title: initialData?.title ?? '',
    sport: initialData?.sport ?? '',
    date: initialData?.date ?? formatDateForInput(selectedDate),
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
    athleteId,
    athleteName,
    selectedDate,
}: SessionModalProps) {
    const queryClient = useQueryClient();
    const isReadOnly = mode === 'view';
    const config = MODAL_CONFIG[mode];

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

    // Remove UseEffect
    useEffect(() => {
        if (open) {
            reset(getDefaultValues(initialData, selectedDate));
        }
    }, [open, initialData, selectedDate, reset]);

    const mutation = useMutation({
        mutationFn: async (data: SessionFormInput) => {
            const endpoint = `/api/athletes/${athleteId}/sessions`;
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

            return response.json() as Promise<{ data: Session }>;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['athleteSessions', athleteId] });
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
                                    value={athleteName || 'Athlète'}
                                    readOnly
                                    placeholder="Athlète"
                                />
                                <ProgramField
                                    icon="sport"
                                    {...register('sport')}
                                    placeholder="Sport"
                                    disabled={isReadOnly}
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
                                className="py-3 px-6"
                            />
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
