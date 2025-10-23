'use client'

import TableSortBtn from "@/components/atoms/buttons/TableSortBtn";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUp } from "lucide-react";

export type Athlete = {
    avatar: string;
    name: string;
    email: string;
    phone: string;
    tag: string;
}

export const columns: ColumnDef<Athlete>[] = [
    {
        accessorKey: 'avatar',
        header: '',
        cell: ({ row }) => (
            <img
                src={row.getValue('avatar')}
                alt="Avatar"
                className="h-10 w-10 rounded-xl object-cover"
            />
        ),
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <TableSortBtn column={column} label="Nom" />
        )

    },
    {
        header: ({ column }) => (
            <TableSortBtn column={column} label="Email" />
        ),
        accessorKey: 'email',
    },
    {
        header: ({ column }) => (
            <TableSortBtn column={column} label="Téléphone" />
        ),
        accessorKey: 'phone',
    },
    {
        header: 'Tag',
        accessorKey: 'tag',
    }
]