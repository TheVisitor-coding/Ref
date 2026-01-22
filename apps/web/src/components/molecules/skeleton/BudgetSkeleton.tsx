import { Skeleton } from "@/components/ui/skeleton";

function BudgetSkeleton() {
    return (
        <div className="flex flex-col gap-6 h-full">
            {/* Header skeleton */}
            <div className="flex items-center justify-between gap-6">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-52" />
            </div>

            {/* Highlight cards skeleton */}
            <div className="grid grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-3 rounded-xl bg-background-light p-6">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-3 w-40" />
                    </div>
                ))}
            </div>

            {/* Tabs skeleton */}
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 border-b border-grey-button pb-2">
                    <Skeleton className="h-8 w-36" />
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-32" />
                </div>

                {/* Search bar skeleton */}
                <Skeleton className="h-12 w-full rounded-lg" />

                {/* Table skeleton */}
                <div className="w-full space-y-3 mt-4">
                    <div className="flex gap-4 bg-grey-light rounded-xl p-4">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-4 flex-1" />
                    </div>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex gap-4 p-4">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-4 w-[120px]" />
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-4 w-[120px]" />
                            <Skeleton className="h-4 flex-1" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BudgetSkeleton;
