'use client'

import { useState, useEffect, useMemo } from 'react';
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
import type { AthleteInvoice } from '@/types/Invoice';
import { toast } from 'sonner';

type InvoiceFormMode = 'create' | 'edit';

interface CreateInvoiceClientProps {
    mode?: InvoiceFormMode;
    initialInvoice?: AthleteInvoice | null;
}

export default function CreateInvoiceClient({ mode = 'create', initialInvoice = null }: CreateInvoiceClientProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
    const [coachData, setCoachData] = useState<{
        name: string;
        address: string;
        city: string;
        email: string;
    } | null>(null);
    const isEditMode = mode === 'edit' && Boolean(initialInvoice);
    const invoiceDocumentId = initialInvoice?.documentId;
    const defaultPaymentInstructions = 'Merci de régler cette facture par virement bancaire.';

    const initialFormValues = useMemo<Partial<InvoiceFormData>>(() => {
        if (isEditMode && initialInvoice) {
            const issueDate = initialInvoice.issued_date
                ? new Date(`${initialInvoice.issued_date}T00:00:00`)
                : new Date();
            const dueDate = initialInvoice.due_date
                ? new Date(`${initialInvoice.due_date}T00:00:00`)
                : undefined;

            const existingLines = initialInvoice.lines && initialInvoice.lines.length > 0
                ? initialInvoice.lines
                : [
                    {
                        id: '1',
                        description: '',
                        quantity: 1,
                        unitPrice: 0,
                    },
                ];

            const normalizedLines = existingLines.map((line, index) => ({
                id: line.id || String(index + 1),
                description: line.description || '',
                quantity: line.quantity ?? 1,
                unitPrice: line.unitPrice ?? 0,
            }));

            return {
                athleteId: initialInvoice.athlete?.id,
                issueDate,
                dueDate,
                lines: normalizedLines,
                description: initialInvoice.description || '',
                taxRate: typeof initialInvoice.tax_rate === 'number' ? initialInvoice.tax_rate : 0.2,
                paymentInstructions: initialInvoice.payment_instructions || defaultPaymentInstructions,
            };
        }

        return {
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
            paymentInstructions: defaultPaymentInstructions,
        };
    }, [isEditMode, initialInvoice, defaultPaymentInstructions]);

    const form = useForm<InvoiceFormData>({
        resolver: zodResolver(InvoiceFormSchema) as any,
        defaultValues: initialFormValues,
    });

    useEffect(() => {
        form.reset(initialFormValues);
    }, [form, initialFormValues]);

    const athleteId = form.watch('athleteId');
    const lines = form.watch('lines') || [];

    const athleteDisplayName = selectedAthlete
        ? `${selectedAthlete.first_name || ''} ${selectedAthlete.last_name || ''}`.trim() || selectedAthlete.username
        : '';

    const resolvedClientName = athleteDisplayName || initialInvoice?.client_name || 'Sélectionnez un athlète';
    const resolvedClientEmail = selectedAthlete?.email || initialInvoice?.client_email || '';
    const resolvedClientAddress = initialInvoice?.client_address || '';
    const resolvedClientCity = initialInvoice?.client_city || '';
    const previewInvoiceNumber = isEditMode && initialInvoice?.invoice_number ? initialInvoice.invoice_number : 'À générer';

    const draftButtonLabel = isSubmitting
        ? 'Enregistrement...'
        : isEditMode
            ? 'Mettre à jour le brouillon'
            : 'Enregistrer en brouillon';

    const sendButtonLabel = isSubmitting
        ? (isEditMode ? 'Mise à jour...' : 'Envoi...')
        : isEditMode
            ? 'Envoyer la facture'
            : 'Envoyer';

    useEffect(() => {
        if (isEditMode && initialInvoice) {
            setCoachData({
                name: initialInvoice.coach_name || '',
                address: initialInvoice.coach_address || '',
                city: initialInvoice.coach_city || '',
                email: initialInvoice.coach_email || '',
            });
        }
    }, [isEditMode, initialInvoice]);

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
        const currentLines = form.getValues('lines') || [];
        const updatedLines = currentLines.map((line) =>
            line.id === id ? { ...line, [field]: value } : line
        );
        form.setValue('lines', updatedLines);
    };

    const handleAddLine = () => {
        const currentLines = form.getValues('lines') || [];
        const numericIds = currentLines
            .map((line) => Number.parseInt(line.id, 10))
            .filter((value) => Number.isFinite(value));
        const nextNumericId = numericIds.length > 0 ? Math.max(...numericIds) + 1 : currentLines.length + 1;
        const newId = nextNumericId.toString();

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

        if (isEditMode && !invoiceDocumentId) {
            toast.error('Impossible de modifier cette facture');
            return;
        }

        setIsSubmitting(true);
        try {
            const endpoint = isEditMode ? `/api/invoices/${invoiceDocumentId}` : '/api/invoices';
            const method = isEditMode ? 'PUT' : 'POST';
            const response = await fetch(endpoint, {
                method,
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
                console.error('Error saving invoice:', errorData);
                toast.error(errorData.error || 'Erreur lors de l\'enregistrement de la facture');
                return;
            }

            await response.json();
            const draftMessage = isEditMode ? 'Brouillon mis à jour avec succès' : 'Brouillon enregistré avec succès';
            const sendMessage = isEditMode ? 'Facture mise à jour et envoyée avec succès' : 'Facture envoyée avec succès';
            toast.success(isDraft ? draftMessage : sendMessage);
            router.push('/budget');
            router.refresh();
        } catch (error) {
            console.error('Error submitting invoice:', error);
            toast.error('Erreur lors de l\'enregistrement de la facture');
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
                                <span>{draftButtonLabel}</span>
                            </div>
                        }
                    />
                    <PrimaryButton
                        onClick={handleSend}
                        disabled={isSubmitting}
                        label={sendButtonLabel}
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
                                invoiceNumber={previewInvoiceNumber}
                                clientName={resolvedClientName}
                                clientAddress={resolvedClientAddress}
                                clientCity={resolvedClientCity}
                                clientEmail={resolvedClientEmail}
                                issueDate={form.watch('issueDate')}
                                dueDate={form.watch('dueDate')}
                                lines={lines}
                                coachName={coachData?.name || ''}
                                coachAddress={coachData?.address || ''}
                                coachCity={coachData?.city || ''}
                                coachEmail={coachData?.email || ''}
                                paymentInstructions={form.watch('paymentInstructions') || ''}
                                tvaRate={(form.watch('taxRate') ?? 0) * 100}
                            />
                        </div>
                    </LayoutCard>
                </div>
            </div>
        </div>
    );
}
