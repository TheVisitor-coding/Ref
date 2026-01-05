import { Skeleton } from "@/components/ui/skeleton";

function CardSkeleton() {
    return (
        <div className="flex gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4 min-w-[280px] rounded-xl bg-background-light p-6">
                    <Skeleton className="h-5 w-24" />
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardSkeleton