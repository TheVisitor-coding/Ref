'use client'

import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
    const totalItems = table.getFilteredRowModel().rows.length;
    const totalPages = table.getPageCount();

    const pageIndex = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;

    const pageNumbers: (number | 'ellipsis')[] = [];
    const maxPageButtons = 5;
    let startPage = Math.max(1, pageIndex + 1 - Math.floor(maxPageButtons / 2));
    let endPage = startPage + maxPageButtons - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
            pageNumbers.push('ellipsis');
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pageNumbers.push('ellipsis');
        }
        pageNumbers.push(totalPages);
    }

    const rangeStart = totalItems === 0 ? 0 : pageIndex * pageSize + 1;
    const rangeEnd = Math.min(totalItems, (pageIndex + 1) * pageSize);


    return (
        <div className="flex flex-col gap-3 border-t border-grey-light px-4 py-4 text-xs text-grey sm:flex-row sm:items-center sm:justify-between sm:text-sm">
            <p className="font-medium text-grey">
                {totalItems === 0
                    ? "Aucune entrée"
                    : `Affichage ${rangeStart}-${rangeEnd} sur ${totalItems} entrées`}
            </p>

            {/* Pagination */}
            {totalPages > 0 && (
                <nav className="flex items-center gap-2" aria-label="Pagination">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-grey-light p-1.5 text-primary transition-colors hover:bg-grey-light/50 disabled:cursor-not-allowed disabled:opacity-40"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        aria-label="Première page"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>

                    <ul className="flex items-center gap-1">
                        {pageNumbers.map((page, index) => {
                            if (page === 'ellipsis') {
                                return (
                                    <li key={`ellipsis-${index}`} className="px-2 py-1 text-grey">
                                        ...
                                    </li>
                                );
                            }

                            const isActive = page === pageIndex + 1;

                            return (
                                <li key={page}>
                                    <button
                                        type="button"
                                        className={`inline-flex min-w-8 items-center justify-center rounded-md border border-grey-light px-2 py-1 text-xs font-medium transition-colors hover:bg-grey-light/50 sm:text-sm ${isActive
                                            ? "bg-primary-blue text-white hover:bg-primary"
                                            : "text-primary"
                                            }`}
                                        onClick={() => table.setPageIndex(page - 1)}
                                        aria-current={isActive ? "page" : undefined}
                                        aria-label={`Page ${page}`}
                                    >
                                        {page}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-grey-light p-1.5 text-primary transition-colors hover:bg-grey-light/50 disabled:cursor-not-allowed disabled:opacity-40"
                        onClick={() => table.setPageIndex(totalPages - 1)}
                        disabled={!table.getCanNextPage()}
                        aria-label="Dernière page"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </nav>
            )}
        </div>
    );
}