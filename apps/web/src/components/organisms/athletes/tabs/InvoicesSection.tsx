'use client';

import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import DataTable from "@/components/molecules/table/DataTable";
import { columns } from "@/components/molecules/table/invoices/Columns";
import { Athlete } from "@/types/User";
import { useApi } from "@/hooks/useApi";
import { AthleteInvoice } from "@/types/Invoice";

const InvoicesSection = ({ athlete }: { athlete: Athlete }) => {
    const {
        data,
        isLoading,
        error,
    } = useApi<{ data: AthleteInvoice[] }>(
        ['athleteInvoices', athlete.id],
        `/api/invoices?athleteId=${athlete.id}`,
        {},
        { staleTime: 1000 * 60 }
    );

    const invoices = data?.data || [];

    return (
        <section className="flex flex-col w-full gap-6">
            <div className="flex gap-4 justify-end">
                <PrimaryButton label="Importer une facture" onClick={() => { /* TODO */ }} />
            </div>

            <div className="flex flex-col w-full gap-6">
                {isLoading && (
                    <p className="text-sm text-grey-button">Chargement des factures...</p>
                )}

                {error && !isLoading && (
                    <p className="text-sm text-accent">Impossible de charger les factures pour ce sportif.</p>
                )}

                {!isLoading && !error && invoices.length === 0 && (
                    <p className="text-sm text-grey-button">Aucune facture disponible pour ce sportif.</p>
                )}

                {!isLoading && !error && invoices.length > 0 && (
                    <DataTable columns={columns} data={invoices} />
                )}
            </div>
        </section>
    );
};

export default InvoicesSection;
