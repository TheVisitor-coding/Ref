'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Folder } from 'lucide-react';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import LayoutCard from '@/components/molecules/card/LayoutCard';
import DateInput from '@/components/atoms/inputs/DateInput';
import InvoiceLineItem, { type InvoiceLine } from '@/components/molecules/invoice/InvoiceLineItem';
import InvoicePreview from '@/components/molecules/invoice/InvoicePreview';
import AthleteSelect from '@/components/molecules/inputs/AthleteSelect';
import { InvoiceFormSchema, type InvoiceFormData } from '@/schema/InvoiceSchema';
import { Athlete } from '@/types/User';
import { toast } from 'sonner';

export default function CreateInvoiceClient() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
    const [coachData, setCoachData] = useState<{
        name: string;
        address: string;
        city: string;
        email: string;
    } | null>(null);

    const form = useForm<InvoiceFormData>({
        resolver: zodResolver(InvoiceFormSchema) as any,
        defaultValues: {
            athleteId: undefined,
            issueDate: new Date(),
            dueDate: undefined,
            lines: [
                {
                    id: '1',
                    description: '',
                    quantity: 1,
                    unitPrice: 0,
                },
            ],
            description: '',
            taxRate: 0.2,
            paymentInstructions: 'Merci de régler cette facture par virement bancaire.',
        },
    });

    const athleteId = form.watch('athleteId');
    const lines = form.watch('lines');

    useEffect(() => {
        const fetchCoachData = async () => {
            try {
                const response = await fetch('/api/permissions');
                const result = await response.json();
                if (result.userId) {
                    const userResponse = await fetch(`/api/users/${result.userId}`);
                    const userData = await userResponse.json();
                    if (userData.data) {
                        const user = userData.data;
                        setCoachData({
                            name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username,
                            address: user.address || '',
                            city: `${user.zip_code || ''} ${user.city || ''}`.trim(),
                            email: user.email || '',
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching coach data:', error);
            }
        };

        fetchCoachData();
    }, []);

    useEffect(() => {
        const fetchAthleteData = async () => {
            if (!athleteId) {
                setSelectedAthlete(null);
                return;
            }

            try {
                const response = await fetch('/api/athletes');
                const result = await response.json();
                const athlete = result.data?.find((a: Athlete) => a.id === athleteId);
                setSelectedAthlete(athlete || null);
            } catch (error) {
                console.error('Error fetching athlete data:', error);
                setSelectedAthlete(null);
            }
        };

        fetchAthleteData();
    }, [athleteId]);

    const handleLineChange = (id: string, field: keyof InvoiceLine, value: string | number) => {
        const currentLines = form.getValues('lines');
        const updatedLines = currentLines.map((line) =>
            line.id === id ? { ...line, [field]: value } : line
        );
        form.setValue('lines', updatedLines);
    };

    const handleAddLine = () => {
        const currentLines = form.getValues('lines');
        const newId = (Math.max(...currentLines.map((l) => parseInt(l.id))) + 1).toString();
        form.setValue('lines', [
            ...currentLines,
            {
                id: newId,
                description: '',
                quantity: 1,
                unitPrice: 0,
            },
        ]);
    };

    const handleSubmit = async (isDraft: boolean) => {
        const isValid = await form.trigger();
        if (!isValid) {
            const errors = form.formState.errors;
            if (errors.athleteId) {
                toast.error('Vous devez sélectionner un athlète');
            } else if (errors.issueDate) {
                toast.error('La date d\'émission est requise');
            } else if (errors.dueDate) {
                toast.error('La date d\'échéance est requise');
            } else if (errors.lines) {
                toast.error('Veuillez remplir correctement toutes les lignes de facture');
            } else {
                toast.error('Veuillez remplir tous les champs requis');
            }
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/invoices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form.getValues(),
                    isDraft,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error creating invoice:', errorData);
                toast.error(errorData.error || 'Erreur lors de la création de la facture');
                return;
            }

            const result = await response.json();
            toast.success(isDraft ? 'Brouillon enregistré avec succès' : 'Facture envoyée avec succès');
            router.push('/budget');
        } catch (error) {
            console.error('Error submitting invoice:', error);
            toast.error('Erreur lors de la création de la facture');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSaveDraft = () => handleSubmit(true);
    const handleSend = () => handleSubmit(false);

    return (
        <div className="flex flex-col gap-6 h-full overflow-hidden">
            {/* Header avec actions */}
            <div className="flex items-center justify-between gap-6 shrink-0">
                <SecondaryButton
                    onClick={() => router.push('/budget')}
                    label={
                        <div className="flex items-center gap-2">
                            <ChevronLeft className="size-5" />
                            <span>Retour</span>
                        </div>
                    }
                />
                <div className="flex gap-4 items-start">
                    <SecondaryButton
                        onClick={handleSaveDraft}
                        disabled={isSubmitting}
                        label={
                            <div className="flex items-center gap-2">
                                <Folder className="size-5" />
                                <span>{isSubmitting ? 'Enregistrement...' : 'Enregister en brouillon'}</span>
                            </div>
                        }
                    />
                    <PrimaryButton
                        onClick={handleSend}
                        disabled={isSubmitting}
                        label={isSubmitting ? 'Envoi...' : 'Envoyer'}
                    />
                </div>
            </div>

            {/* Contenu principal : deux colonnes */}
            <div className="flex gap-6 items-start h-full overflow-hidden">
                {/* Colonne gauche : Formulaire */}
                <div className="flex-1 h-full overflow-y-auto">
                    <LayoutCard title="Contenu de la facture">
                        <div className="flex flex-col gap-6 p-6">
                            {/* Sélection athlète */}
                            <Controller
                                name="athleteId"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <div className="flex flex-col gap-2">
                                        <AthleteSelect
                                            value={field.value}
                                            onChange={field.onChange}
                                            required
                                        />
                                        {fieldState.error && (
                                            <span className="text-sm text-accent">{fieldState.error.message}</span>
                                        )}
                                    </div>
                                )}
                            />

                            {/* Dates */}
                            <div className="flex gap-6 items-center">
                                <Controller
                                    name="issueDate"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <div className="flex-1 flex flex-col gap-1">
                                            <DateInput
                                                label="Date d'émission"
                                                value={field.value}
                                                onChange={field.onChange}
                                                required
                                                className="flex-1"
                                            />
                                            {fieldState.error && (
                                                <span className="text-sm text-accent">{fieldState.error.message}</span>
                                            )}
                                        </div>
                                    )}
                                />
                                <Controller
                                    name="dueDate"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <div className="flex-1 flex flex-col gap-1">
                                            <DateInput
                                                label="Date d'échéance"
                                                value={field.value}
                                                onChange={field.onChange}
                                                required
                                                className="flex-1"
                                            />
                                            {fieldState.error && (
                                                <span className="text-sm text-accent">{fieldState.error.message}</span>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>

                            {/* Lignes de facture */}
                            {lines.map((line, index) => (
                                <InvoiceLineItem
                                    key={line.id}
                                    line={line}
                                    onChange={handleLineChange}
                                />
                            ))}

                            {/* Bouton ajouter ligne */}
                            <div className="flex justify-end">
                                <SecondaryButton onClick={handleAddLine} label="Ajouter une ligne" />
                            </div>
                        </div>
                    </LayoutCard>
                </div>

                {/* Colonne droite : Aperçu */}
                <div className="flex-1 h-full overflow-y-auto">
                    <LayoutCard title="Aperçu">
                        <div className="p-2">
                            <InvoicePreview
                                invoiceNumber="À générer"
                                clientName={
                                    selectedAthlete
                                        ? `${selectedAthlete.first_name || ''} ${selectedAthlete.last_name || ''}`.trim() ||
                                        selectedAthlete.username
                                        : 'Sélectionnez un athlète'
                                }
                                clientAddress=''
                                clientCity=''
                                clientEmail={selectedAthlete?.email || ''}
                                issueDate={form.watch('issueDate')}
                                dueDate={form.watch('dueDate')}
                                lines={lines}
                                coachName={coachData?.name || ''}
                                coachAddress={coachData?.address || ''}
                                coachCity={coachData?.city || ''}
                                coachEmail={coachData?.email || ''}
                                paymentInstructions={form.watch('paymentInstructions') || ''}
                                tvaRate={form.watch('taxRate') * 100}
                            />
                        </div>
                    </LayoutCard>
                </div>
            </div>
        </div>
    );
}
