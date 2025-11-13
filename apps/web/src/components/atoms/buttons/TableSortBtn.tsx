import { ArrowUp } from "lucide-react";

function TableSortBtn({ column, label }: { column: any, label: string }) {
    return (
        <button className="cursor-pointer flex items-center gap-3" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            {label}
            <ArrowUp className={`h-4 w-4 transition-transform ${column.getIsSorted() === "asc" ? "rotate-180" : ""}`} />
        </button>
    );
}

export default TableSortBtn;