import { Skeleton } from '@/components/ui/skeleton';

export function AgendaSkeleton() {
    return (
        <div className="flex flex-col gap-6 h-full animate-in fade-in duration-300">
            <div className="flex items-center justify-between gap-6">
                <Skeleton className="h-6 w-24" />
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-32 rounded-lg" />
                    <Skeleton className="h-10 w-44 rounded-lg" />
                </div>
            </div>

            <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-7 w-40" />
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-24 rounded-lg" />
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <Skeleton className="h-10 w-28 rounded-lg" />
                    </div>
                </div>

                <div className="flex-1 rounded-xl border border-grey-button overflow-hidden">
                    <div className="grid grid-cols-7 border-b border-grey-button">
                        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
                            <div key={day} className="p-3 text-center border-r border-grey-button last:border-r-0">
                                <Skeleton className="h-4 w-8 mx-auto" />
                            </div>
                        ))}
                    </div>

                    {Array.from({ length: 5 }).map((_, rowIndex) => (
                        <div key={rowIndex} className="grid grid-cols-7 border-b border-grey-button last:border-b-0">
                            {Array.from({ length: 7 }).map((_, colIndex) => (
                                <div
                                    key={colIndex}
                                    className="p-2 min-h-[100px] border-r border-grey-button last:border-r-0"
                                >
                                    <Skeleton className="h-4 w-6 mb-2" />
                                    {rowIndex % 2 === 0 && colIndex % 3 === 0 && (
                                        <Skeleton className="h-6 w-full rounded" />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
