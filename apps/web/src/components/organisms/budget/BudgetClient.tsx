'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DataTable from '@/components/molecules/table/DataTable';
import { invoicesColumns } from '@/components/molecules/table/invoices/InvoiceColumns';
import InvoiceSearchBar from '@/components/molecules/inputs/InvoiceSearchBar';
import HighlightCard from '@/components/molecules/cards/HighlightCard';
import Breadcrumbs from '@/components/atoms/breadcrumb/breadcrumbs';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import Image from 'next/image';
import { AthleteInvoice } from '@/types/Invoice';

const MOCK_INVOICES: AthleteInvoice[] = [
    {
        id: 1,
        invoice_number: 'INV-0001',
        amount: 169.99,
        statusInvoice: 'draft',
        due_date: '2025-01-12',
        issued_date: '12/12/2025',
    },
    {
        id: 2,
        invoice_number: 'INV-0002',
        amount: 169.99,
        statusInvoice: 'sent',
        due_date: '2025-01-12',
        issued_date: '12/12/2025',
    },
    {
        id: 3,
        invoice_number: 'INV-0003',
        amount: 169.99,
        statusInvoice: 'sent',
        due_date: '2025-01-12',
        issued_date: '12/12/2025',
    },
    {
        id: 4,
        invoice_number: 'INV-0004',
        amount: 169.99,
        statusInvoice: 'sent',
        due_date: '2025-01-12',
        issued_date: '12/12/2025',
    },
    {
        id: 5,
        invoice_number: 'INV-0005',
        amount: 169.99,
        statusInvoice: 'overdue',
        due_date: '2025-01-12',
        issued_date: '12/12/2025',
    },
    {
        id: 6,
        invoice_number: 'INV-0006',
        amount: 169.99,
        statusInvoice: 'paid',
        due_date: '2025-01-12',
        issued_date: '12/12/2025',
    },
    {
        id: 7,
        invoice_number: 'INV-0007',
        amount: 169.99,
        statusInvoice: 'paid',
        due_date: '2025-01-12',
        issued_date: '12/12/2025',
    },
    {
        id: 8,
        invoice_number: 'INV-0008',
        amount: 169.99,
        statusInvoice: 'paid',
        due_date: '2025-01-12',
        issued_date: '12/12/2025',
    },
];

export default function BudgetClient() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const filteredInvoices = MOCK_INVOICES.filter((invoice) => {
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

    const draftCount = MOCK_INVOICES.filter((inv) => inv.statusInvoice === 'draft').length;
    const unpaidCount = MOCK_INVOICES.filter((inv) => inv.statusInvoice === 'overdue').length;
    const paidCount = MOCK_INVOICES.filter((inv) => inv.statusInvoice === 'paid').length;
    const pendingCount = MOCK_INVOICES.filter((inv) => inv.statusInvoice === 'sent').length;

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
                    onClick={() => console.log('Créer une nouvelle facture')}
                    label="Créer une nouvelle facture"
                />
            </div>

            <div className="grid grid-cols-4 gap-6">
                <HighlightCard
                    title="Revenus"
                    value="20 658€"
                    description="Sur l'année en cours"
                    badge={{ label: '+ 5%', variant: 'positive' }}
                />
                <HighlightCard
                    title="Factures payées"
                    value="1 887€"
                    description="Sur ce mois-ci"
                />
                <HighlightCard
                    title="Paiement en attente"
                    value="4"
                    description="540,00€ à venir"
                />
                <HighlightCard
                    title="Paiement en retard"
                    value="2"
                    description="540,00€ impayé"
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
                                {draftCount}
                            </span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="unpaid"
                            className="data-[state=active]:border-b-2 data-[state=active]:border-b-primary-blue data-[state=active]:text-primary-blue pb-2 px-3 rounded-none gap-2"
                        >
                            Impayé
                            <span className="inline-flex items-center justify-center size-4 text-[10px] bg-primary-blue-light text-black rounded">
                                {unpaidCount}
                            </span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="paid"
                            className="data-[state=active]:border-b-2 data-[state=active]:border-b-primary-blue data-[state=active]:text-primary-blue pb-2 px-3 rounded-none gap-2"
                        >
                            Payé
                            <span className="inline-flex items-center justify-center size-4 text-[10px] bg-primary-blue-light text-black rounded">
                                {paidCount}
                            </span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="pending"
                            className="data-[state=active]:border-b-2 data-[state=active]:border-b-primary-blue data-[state=active]:text-primary-blue pb-2 px-3 rounded-none gap-2"
                        >
                            En attente
                            <span className="inline-flex items-center justify-center size-4 text-[10px] bg-primary-blue-light text-black rounded">
                                {pendingCount}
                            </span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="mt-4">
                        <InvoiceSearchBar onSearch={setSearchQuery} />
                        <div className="mt-4">
                            <DataTable maxItemPerPage={6} columns={invoicesColumns} data={filteredInvoices} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}