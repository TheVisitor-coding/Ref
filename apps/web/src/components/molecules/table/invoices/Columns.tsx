
'use client';

import TableSortBtn from "@/components/atoms/buttons/TableSortBtn";
import InvoiceStatusBadge from "@/components/atoms/badges/InvoiceStatusBadge";
import { AthleteInvoice } from "@/types/Invoice";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { InvoiceStatus } from "@/data/invoiceStatuses";

export const columns: ColumnDef<AthleteInvoice>[] = [
    {
        accessorKey: 'invoice_number',
        header: ({ column }) => (
            <TableSortBtn column={column} label="Nom de la facture" />
        ),
        cell: ({ row }) => (
            <span className="text-sm text-primary">{row.original.invoice_number || '-'}</span>
        ),
    },
    {
        accessorKey: 'issued_date',
        header: ({ column }) => (
            <TableSortBtn column={column} label="Date de facturation" />
        ),
        cell: ({ row }) => {
            const date = row.original.issued_date;
            if (!date) return <span className="text-sm text-primary">-</span>;

            const formatted = new Date(date).toLocaleDateString('fr-FR');
            return <span className="text-sm text-primary">{formatted}</span>;
        },
    },
    {
        accessorKey: 'statusInvoice',
        header: ({ column }) => (
            <TableSortBtn column={column} label="État" />
        ),
        cell: ({ row }) => {
            const status = (row.getValue('statusInvoice') as InvoiceStatus) || 'draft';
            return <InvoiceStatusBadge status={status} />;
        },
    },
    {
        header: '',
        accessorKey: 'actions',
        cell: () => (
            <button className="text-primary font-medium underline text-sm">
                <ChevronRight size={20} />
            </button>
        )
    }
]