'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DataTable from '@/components/molecules/table/DataTable';
import { invoicesColumns } from '@/components/molecules/table/invoices/InvoiceColumns';
import InvoiceSearchBar from '@/components/molecules/inputs/InvoiceSearchBar';
import HighlightCard from '@/components/molecules/cards/HighlightCard';
import Breadcrumbs from '@/components/atoms/breadcrumb/breadcrumbs';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import BudgetSkeleton from '@/components/molecules/skeleton/BudgetSkeleton';
import Image from 'next/image';
import { useCoachInvoices } from '@/hooks/useInvoices';

export default function BudgetClient() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const { data: invoices = [], isLoading, error } = useCoachInvoices();

    const filteredInvoices = useMemo(() => {
        return invoices.filter((invoice) => {
            const matchesSearch =
                invoice.invoice_number.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTab =
                activeTab === 'all' ||
                (activeTab === 'draft' && invoice.statusInvoice === 'draft') ||
                (activeTab === 'unpaid' && invoice.statusInvoice === 'overdue') ||
                (activeTab === 'paid' && invoice.statusInvoice === 'paid') ||
                (activeTab === 'pending' && invoice.statusInvoice === 'sent');

            return matchesSearch && matchesTab;
        });
    }, [invoices, searchQuery, activeTab]);

    const stats = useMemo(() => {
        const draft = invoices.filter((inv) => inv.statusInvoice === 'draft');
        const unpaid = invoices.filter((inv) => inv.statusInvoice === 'overdue');
        const paid = invoices.filter((inv) => inv.statusInvoice === 'paid');
        const pending = invoices.filter((inv) => inv.statusInvoice === 'sent');

        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();

        const yearlyRevenue = invoices
            .filter((inv) => {
                if (!inv.issued_date || inv.statusInvoice !== 'paid') return false;
                const date = new Date(inv.issued_date);
                return date.getFullYear() === currentYear;
            })
            .reduce((sum, inv) => sum + (inv.amount_ttc || 0), 0);

        const monthlyRevenue = invoices
            .filter((inv) => {
                if (!inv.issued_date || inv.statusInvoice !== 'paid') return false;
                const date = new Date(inv.issued_date);
                return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
            })
            .reduce((sum, inv) => sum + (inv.amount_ttc || 0), 0);

        const pendingAmount = pending.reduce((sum, inv) => sum + (inv.amount_ttc || 0), 0);
        const overdueAmount = unpaid.reduce((sum, inv) => sum + (inv.amount_ttc || 0), 0);

        return {
            draftCount: draft.length,
            unpaidCount: unpaid.length,
            paidCount: paid.length,
            pendingCount: pending.length,
            yearlyRevenue,
            monthlyRevenue,
            pendingAmount,
            overdueAmount,
        };
    }, [invoices]);

    if (isLoading) {
        return <BudgetSkeleton />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4">
                <p className="text-accent text-lg">Erreur lors du chargement des factures</p>
                <PrimaryButton onClick={() => window.location.reload()} label="Réessayer" />
            </div>
        );
    }


    return (
        <div className="flex flex-col gap-6 h-full">
            <div className="flex items-center justify-between gap-6">
                <Breadcrumbs
                    items={[
                        {
                            label: 'Facturation',
                            href: '/budget',
                            icon: <Image src="/icons/Wallet.svg" alt="Wallet Icon" width={16} height={16} />,
                        },
                    ]}
                />

                <PrimaryButton
                    onClick={() => router.push('/budget/create')}
                    label="Créer une nouvelle facture"
                />
            </div>

            <div className="grid grid-cols-4 gap-6">
                <HighlightCard
                    title="Revenus"
                    value={`${stats.yearlyRevenue.toFixed(2)}€`}
                    description="Sur l'année en cours"
                />
                <HighlightCard
                    title="Factures payées"
                    value={`${stats.monthlyRevenue.toFixed(2)}€`}
                    description="Sur ce mois-ci"
                />
                <HighlightCard
                    title="Paiement en attente"
                    value={stats.pendingCount.toString()}
                    description={`${stats.pendingAmount.toFixed(2)}€ à venir`}
                />
                <HighlightCard
                    title="Paiement en retard"
                    value={stats.unpaidCount.toString()}
                    description={`${stats.overdueAmount.toFixed(2)}€ impayé`}
                />
            </div>

            <div className="flex flex-col gap-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="border-b border-grey-button pb-0 h-auto bg-transparent gap-2">
                        <TabsTrigger
                            value="all"
                            className="data-[state=active]:border-b-2 data-[state=active]:border-b-primary-blue data-[state=active]:text-primary-blue pb-2 px-3 rounded-none"
                        >
                            Toutes les factures
                        </TabsTrigger>
                        <TabsTrigger
                            value="draft"
                            className="data-[state=active]:border-b-2 data-[state=active]:border-b-primary-blue data-[state=active]:text-primary-blue pb-2 px-3 rounded-none gap-2"
                        >
                            Brouillon
                            <span className="inline-flex items-center justify-center size-4 text-[10px] bg-primary-blue-light text-black rounded">
                                {stats.draftCount}
                            </span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="unpaid"
                            className="data-[state=active]:border-b-2 data-[state=active]:border-b-primary-blue data-[state=active]:text-primary-blue pb-2 px-3 rounded-none gap-2"
                        >
                            Impayé
                            <span className="inline-flex items-center justify-center size-4 text-[10px] bg-primary-blue-light text-black rounded">
                                {stats.unpaidCount}
                            </span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="paid"
                            className="data-[state=active]:border-b-2 data-[state=active]:border-b-primary-blue data-[state=active]:text-primary-blue pb-2 px-3 rounded-none gap-2"
                        >
                            Payé
                            <span className="inline-flex items-center justify-center size-4 text-[10px] bg-primary-blue-light text-black rounded">
                                {stats.paidCount}
                            </span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="pending"
                            className="data-[state=active]:border-b-2 data-[state=active]:border-b-primary-blue data-[state=active]:text-primary-blue pb-2 px-3 rounded-none gap-2"
                        >
                            En attente
                            <span className="inline-flex items-center justify-center size-4 text-[10px] bg-primary-blue-light text-black rounded">
                                {stats.pendingCount}
                            </span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="mt-4">
                        <InvoiceSearchBar onSearch={setSearchQuery} />
                        <div className="mt-4">
                            {isLoading ? (
                                <div className="text-center py-8 text-grey-button">Chargement...</div>
                            ) : error ? (
                                <div className="text-center py-8 text-accent">Erreur lors du chargement des factures</div>
                            ) : (
                                <DataTable maxItemPerPage={6} columns={invoicesColumns} data={filteredInvoices} />
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}