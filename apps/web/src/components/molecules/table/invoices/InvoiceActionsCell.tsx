'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { SquarePen, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import type { AthleteInvoice } from '@/types/Invoice';

interface InvoiceActionsCellProps {
    invoice: AthleteInvoice;
}

export default function InvoiceActionsCell({ invoice }: InvoiceActionsCellProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const recordId = invoice.documentId || (invoice.id ? String(invoice.id) : undefined);

    const handleEdit = () => {
        if (!recordId) {
            toast.error('Identifiant de facture manquant');
            return;
        }
        router.push(`/budget/${recordId}/edit`);
    };

    const handleDelete = async () => {
        if (!recordId) {
            toast.error('Identifiant de facture manquant');
            return;
        }

        setIsDeleting(true);
        try {
            const response = await fetch(`/api/invoices/${recordId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                toast.error(errorData?.error || 'Erreur lors de la suppression de la facture');
                return;
            }

            toast.success('Facture supprimée avec succès');
            setIsDialogOpen(false);
            await queryClient.invalidateQueries({ queryKey: ['invoices'] });
        } catch (error) {
            console.error('Error deleting invoice:', error);
            toast.error('Erreur lors de la suppression de la facture');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-end gap-2">
                <button
                    type="button"
                    onClick={handleEdit}
                    className="p-2 hover:bg-grey-light rounded-lg transition-colors"
                    aria-label="Modifier la facture"
                >
                    <SquarePen className="size-5 text-primary" />
                </button>
                <button
                    type="button"
                    onClick={() => setIsDialogOpen(true)}
                    className="p-2 hover:bg-grey-light rounded-lg transition-colors"
                    aria-label="Supprimer la facture"
                >
                    <Trash2 className="size-5 text-primary" />
                </button>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!isDeleting) setIsDialogOpen(open); }}>
                <DialogContent className="max-w-md" showCloseButton={!isDeleting}>
                    <DialogHeader>
                        <DialogTitle>Supprimer ce brouillon ?</DialogTitle>
                        <DialogDescription>
                            Cette action est irréversible. La facture brouillon sera définitivement supprimée.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <SecondaryButton
                            onClick={() => setIsDialogOpen(false)}
                            disabled={isDeleting}
                            label="Annuler"
                        />
                        <PrimaryButton
                            onClick={handleDelete}
                            disabled={isDeleting}
                            label={isDeleting ? 'Suppression...' : 'Supprimer'}
                        />
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
