'use client'

import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import LayoutCard from "@/components/molecules/card/LayoutCard";
import FormField from "@/components/molecules/form/FormField";
import SelectField from "@/components/molecules/form/SelectField";
import TextAreaField from "@/components/molecules/form/TextareaField";
import { Spinner } from "@/components/ui/spinner";
import { objectiveFields, personalFields } from "@/data/form/informationAthleteForm";
import { AthleteUpdateForm, athleteUpdateSchema } from "@/schema/AthleteSchema";
import { AthleteLevel, AthleteWithRelation } from "@/types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const Row: React.FC<{ children: React.ReactNode; padding?: string }> = ({ children, padding }) => (
    <div className={`flex gap-6 ${padding}`}>{children}</div>
);

function InformationSection({ athlete }: { athlete: AthleteWithRelation }) {
    const qc = useQueryClient()
    const [error, setError] = useState<string | null>(null);


    const form = useForm<AthleteUpdateForm>({
        resolver: zodResolver(athleteUpdateSchema),
        defaultValues: {
            first_name: athlete.first_name ?? '',
            last_name: athlete.last_name ?? '',
            email: athlete.email ?? '',
            phone: athlete.phone ?? '',
            height: athlete?.height ?? '',
            weight: athlete?.weight ?? '',
            birth_date: athlete?.birth_date ?? '',
            tag: athlete?.tag ?? '',
            discipline: athlete.discipline ?? '',
            level: (athlete.level as AthleteLevel) ?? '',
            mainObjective: athlete?.mainObjective ?? '',
            secondaryObjective: athlete?.secondaryObjective ?? '',
            relation_notes: athlete.athlete_relations?.notes ?? '',
        },
        mode: 'onBlur'
    })

    const { register, control, handleSubmit, formState: { errors, isDirty, isSubmitting } } = form;

    const mutation = useMutation<
        { data: AthleteWithRelation },
        Error,
        AthleteUpdateForm,
        { previousData?: { data: AthleteWithRelation } }
    >({
        mutationFn: async (input: AthleteUpdateForm) => {
            const res = await fetch(`/api/athletes/${athlete.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(input),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err?.error || `Request failed: ${res.status}`);
            }
            return res.json() as Promise<{ data: AthleteWithRelation }>;
        },
        onMutate: async (input) => {
            setError(null);
            const key = ['athlete', athlete.id];
            await qc.cancelQueries({ queryKey: key });
            const previousData = qc.getQueryData<{ data: AthleteWithRelation }>(key);
            qc.setQueryData(key, {
                data: { ...athlete, ...input } as AthleteWithRelation,
            });
            const next: AthleteWithRelation = {
                ...athlete,
                ...input,
                height: input.height ? Number(input.height) : null,
                weight: input.weight ? Number(input.weight) : null,
                athlete_relations: {
                    ...(athlete.athlete_relations ?? { id: 0, documentId: '' }),
                    notes: input.relation_notes ?? athlete.athlete_relations?.notes,
                }
            };
            qc.setQueryData(key, { data: next });
            return { previousData };
        },
        onError: (err, _input, ctx) => {
            if (ctx?.previousData) qc.setQueryData(['athlete', athlete.id], ctx.previousData);
            setError((err as Error).message);
        },
        onSuccess: (data) => {
            qc.setQueryData(['athlete', athlete.id], data);
            qc.invalidateQueries({ queryKey: ['athletes'] });
            toast.success("Informations mises à jour avec succès !");
        },
    })
    const onSubmit = handleSubmit((values) => {
        const { relation_notes, ...rest } = values
        const payload = athleteUpdateSchema.parse(rest)
        mutation.mutate({ ...payload, relation_notes });
    })

    return (
        <section className="flex flex-col w-full gap-6">
            <div className="flex gap-4 justify-end">
                <SecondaryButton label="Renvoyer l'invitation" onClick={() => {/* TODO */ }} />
                <PrimaryButton
                    label={mutation.isPending ? (
                        <span className="flex items-center gap-2">
                            Sauvegarde <Spinner />
                        </span>
                    ) : "Sauvegarder"}
                    onClick={onSubmit}
                    disabled={!isDirty || mutation.isPending}
                />
            </div>

            {error && <p className="text-red-600">{error}</p>}

            <form onSubmit={onSubmit} className="flex flex-col w-full gap-6">
                <LayoutCard title="Informations personnelles">
                    <Row padding="p-6">
                        {personalFields.slice(0, 2).map(f => (
                            <FormField
                                key={f.name}
                                label={f.label}
                                type={f.type}
                                placeholder={f.placeholder}
                                required={f.required}
                                error={errors[f.name]?.message as string | undefined}
                                {...register(f.name)}
                            />
                        ))}
                    </Row>

                    <Row padding="px-6 pb-6">
                        {personalFields.slice(2, 4).map(f => (
                            <FormField
                                key={f.name}
                                label={f.label}
                                type={f.type}
                                placeholder={f.placeholder}
                                required={f.required}
                                error={errors[f.name]?.message as string | undefined}
                                {...register(f.name)}
                            />
                        ))}
                    </Row>

                    <Row padding="px-6 pb-6">
                        {personalFields.slice(4, 6).map(f => (
                            <FormField
                                key={f.name}
                                label={f.label}
                                type={f.type}
                                placeholder={f.placeholder}
                                required={f.required}
                                error={errors[f.name]?.message as string | undefined}
                                {...register(f.name)}
                            />
                        ))}
                    </Row>

                    <Row padding="px-6 pb-6">
                        {personalFields.slice(6, 8).map(f => (
                            <FormField
                                key={f.name}
                                label={f.label}
                                type={f.type}
                                placeholder={f.placeholder}
                                required={f.required}
                                error={errors[f.name]?.message as string | undefined}
                                {...register(f.name)}
                            />
                        ))}
                    </Row>
                    <button type="submit" className="hidden" />
                </LayoutCard>

                <LayoutCard title="Objectifs de sport">
                    <Row padding="p-6">
                        {objectiveFields.slice(2, 4).map(f => (
                            <Controller
                                key={f.name}
                                control={control}
                                name={f.name}
                                render={({ field }) => (
                                    <SelectField
                                        label={f.label}
                                        placeholder={f.placeholder}
                                        options={f.options || []}
                                        value={field.value || undefined}
                                        onChange={field.onChange}
                                        error={errors[f.name]?.message as string | undefined}
                                    />
                                )}
                            />

                        ))}
                    </Row>

                    <Row padding="px-6 pb-6">
                        {objectiveFields.slice(0, 2).map(f => (
                            <FormField
                                key={f.name}
                                label={f.label}
                                placeholder={f.placeholder}
                                error={errors[f.name]?.message as string | undefined}
                                {...register(f.name)}
                            />
                        ))}
                    </Row>

                    <button type="submit" className="hidden" />
                </LayoutCard>

                <LayoutCard title="Notes supplémentaires">
                    <Row padding="p-6">
                        <TextAreaField
                            label="Notes"
                            placeholder="Tapez les notes supplémentaires sur votre sportif..."
                            error={errors.relation_notes?.message}
                            {...register('relation_notes')}
                        />
                    </Row>
                </LayoutCard>
            </form>

        </section>
    );
}

export default InformationSection;