import { ArrowUp } from "lucide-react";
import { Column } from "@tanstack/react-table";

type SortableColumn = Pick<Column<unknown, unknown>, 'getIsSorted' | 'toggleSorting'>;

function TableSortBtn({ column, label }: { column: SortableColumn; label: string }) {
    const isAscending = column.getIsSorted() === "asc";
    return (
        <button className="cursor-pointer flex items-center gap-3" onClick={() => column.toggleSorting(isAscending)}>
            {label}
            <ArrowUp className={`h-4 w-4 transition-transform ${isAscending ? "rotate-180" : ""}`} />
        </button>
    );
}

export default TableSortBtn;