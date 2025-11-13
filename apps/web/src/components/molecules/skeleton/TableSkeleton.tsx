import { Skeleton } from "@/components/ui/skeleton";

function TableSkeleton() {
    return (
        <div className="w-full space-y-3">
            <div className="flex gap-4 bg-grey-light rounded-xl p-4">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 flex-1" />
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4 p-4">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-4 flex-1" />
                </div>
            ))}
        </div>
    );
}

export default TableSkeleton;