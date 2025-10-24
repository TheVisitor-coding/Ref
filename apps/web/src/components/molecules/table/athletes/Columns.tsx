'use client'

import TableSortBtn from "@/components/atoms/buttons/TableSortBtn";
import { Athlete } from "@/types/User";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const DEFAULT_AVATAR = "/users/profilePic.png";

const resolveAvatarUrl = (path?: string | null) => {
    if (!path) return DEFAULT_AVATAR;
    if (/^https?:\/\//.test(path)) return path;

    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "");
    if (!baseUrl) return DEFAULT_AVATAR;

    try {
        const url = new URL(path, baseUrl);
        if (typeof window !== "undefined") {
            const localHosts = new Set(["localhost", "127.0.0.1", "backend", "strapi"]);
            if (localHosts.has(url.hostname)) {
                url.hostname = window.location.hostname;
            }
        }
        return url.href;
    } catch {
        return DEFAULT_AVATAR;
    }
};

export const columns: ColumnDef<Athlete>[] = [
    {
        accessorKey: 'avatar',
        header: '',
        cell: ({ row }) => {
            const avatarUrl = resolveAvatarUrl(row.original.avatar?.url);
            const athleteName = `${row.original.first_name ?? ""} ${row.original.last_name ?? ""}`.trim() || "Sportif";
            return (
                <Image
                    src={avatarUrl}
                    alt={`Avatar de ${athleteName}`}
                    width={40}
                    height={40}
                    unoptimized
                    className="h-10 w-10 rounded-xl object-cover"
                />
            );
        }
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <TableSortBtn column={column} label="Nom" />
        ),
        cell: ({ row }) => (
            <span>
                {row.original.first_name} {row.original.last_name}
            </span>
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
        cell: ({ row }) => (
            <span className="text-sm text-secondary bg-background-grey-light px-2 py-1 rounded-lg">
                {row.getValue('tag')}
            </span>
        )
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