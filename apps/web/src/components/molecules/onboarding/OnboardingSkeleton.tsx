import { Skeleton } from '@/components/ui/skeleton';

export function OnboardingStepSkeleton() {
    return (
        <div className="flex flex-col w-full gap-10 animate-in fade-in duration-300">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-12 w-1/2" />
                <Skeleton className="h-5 w-2/3 mt-2" />
            </div>
            <div className="flex flex-wrap gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-32 rounded-lg" />
                ))}
            </div>
        </div>
    );
}

export function OnboardingSliderSkeleton() {
    return (
        <div className="flex flex-col w-full gap-10 animate-in fade-in duration-300">
            <Skeleton className="h-12 w-3/4" />
            <div className="flex flex-col gap-2 py-10">
                <Skeleton className="h-2 w-full rounded-lg" />
                <div className="flex justify-between mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-6" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function OnboardingFeaturesSkeleton() {
    return (
        <div className="flex flex-col w-full gap-10 animate-in fade-in duration-300">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-12 w-2/3" />
                <Skeleton className="h-12 w-1/2" />
                <Skeleton className="h-5 w-full mt-2" />
            </div>
            <div className="flex flex-col gap-4">
                {Array.from({ length: 3 }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex gap-4">
                        <Skeleton className="h-24 w-1/2 rounded-xl" />
                        <Skeleton className="h-24 w-1/2 rounded-xl" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function OnboardingInputSkeleton() {
    return (
        <div className="flex flex-col w-full gap-10 animate-in fade-in duration-300">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-12 w-full rounded-lg" />
        </div>
    );
}
