'use client';

import TableSortBtn from '@/components/atoms/buttons/TableSortBtn';
import InvoiceStatusBadge from '@/components/atoms/badges/InvoiceStatusBadge';
import { AthleteInvoice } from '@/types/Invoice';
import { ColumnDef } from '@tanstack/react-table';
import { SquarePen, Trash2, Download, Send } from 'lucide-react';
import { InvoiceStatus } from '@/data/invoiceStatuses';
import { Checkbox } from '@/components/ui/checkbox';

export const invoicesColumns: ColumnDef<AthleteInvoice>[] = [
    {
        id: 'select',
        header: () => <div className="w-5" />,
        cell: () => <Checkbox />,
        size: 52,
    },
    {
        accessorKey: 'invoice_number',
        header: ({ column }) => <TableSortBtn column={column} label="N° de facture" />,
        cell: ({ row }) => <span className="text-sm text-primary">{row.getValue('invoice_number')}</span>,
    },
    {
        accessorKey: 'athlete',
        header: ({ column }) => <TableSortBtn column={column} label="Sportif" />,
        cell: () => <span className="text-sm text-primary">Alex Sanchez</span>,
    },
    {
        accessorKey: 'issued_date',
        header: ({ column }) => <TableSortBtn column={column} label="Date" />,
        cell: ({ row }) => <span className="text-sm text-primary">{row.getValue('issued_date')}</span>,
    },
    {
        accessorKey: 'statusInvoice',
        header: ({ column }) => <TableSortBtn column={column} label="Statut" />,
        cell: ({ row }) => (
            <InvoiceStatusBadge status={(row.getValue('statusInvoice') as InvoiceStatus) || 'draft'} />
        ),
    },
    {
        accessorKey: 'amount',
        header: ({ column }) => <TableSortBtn column={column} label="Montant" />,
        cell: ({ row }) => {
            const amount = row.getValue('amount') as number;
            return <span className="text-sm text-primary">{amount.toFixed(2)} €</span>;
        },
    },
    {
        id: 'actions',
        header: () => <span className="text-sm text-center w-full block font-medium text-primary">Action</span>,
        cell: ({ row }) => {
            const status = row.getValue('statusInvoice') as InvoiceStatus;

            if (status === 'draft') {
                return (
                    <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-grey-light rounded-lg transition-colors">
                            <SquarePen className="size-5 text-primary" />
                        </button>
                        <button className="p-2 hover:bg-grey-light rounded-lg transition-colors">
                            <Trash2 className="size-5 text-primary" />
                        </button>
                    </div>
                );
            }

            if (status === 'overdue') {
                return (
                    <button className="flex items-center gap-2 px-3 py-2 ml-auto border border-grey-button rounded-lg hover:bg-grey-light transition-colors">
                        <Send className="size-5 text-primary-blue" />
                        <span className="text-sm font-medium text-primary-blue">Relancer</span>
                    </button>
                );
            }

            if (status === 'paid') {
                return (
                    <div className="flex items-center justify-end">
                        <button className="p-2 hover:bg-grey-light rounded-lg transition-colors">
                            <Download className="size-5 text-primary" />
                        </button>
                    </div>
                );
            }

            return <div className="w-[142px]" />;
        },
        size: 142,
    },
];
