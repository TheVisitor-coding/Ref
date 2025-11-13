'use client'

import TableSortBtn from "@/components/atoms/buttons/TableSortBtn";
import { AthleteInvoice } from "@/types/Invoice";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";

export const columns: ColumnDef<AthleteInvoice>[] = [
    {
        accessorKey: 'title',
        header: ({ column }) => (
            <TableSortBtn column={column} label="Nom de la facture" />
        ),
    },
    {
        accessorKey: 'billing_date',
        header: ({ column }) => (
            <TableSortBtn column={column} label="Date de facturation" />
        ),
    },
    {
        accessorKey: 'state',
        header: ({ column }) => (
            <TableSortBtn column={column} label="État" />
        ),
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