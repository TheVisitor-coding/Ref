'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useOnboardingStore from '@/store/OnboardingStore';

interface SignUpGuardProps {
    children: React.ReactNode;
}

export default function SignUpGuard({ children }: SignUpGuardProps) {
    const router = useRouter();
    const { isOnboardingComplete, completedSteps } = useOnboardingStore();
    const [isHydrated, setIsHydrated] = useState(false);
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (!isHydrated) return;

        const complete = isOnboardingComplete();
        setHasAccess(complete);

        if (!complete) {
            const stepRoutes = {
                1: '/auth/onboarding',
                2: '/auth/onboarding/sports',
                3: '/auth/onboarding/athletes-count',
                4: '/auth/onboarding/features',
            } as const;

            const firstIncompleteStep = ([1, 2, 3, 4] as const).find(
                (s) => !completedSteps.includes(s)
            ) ?? 1;

            router.replace(stepRoutes[firstIncompleteStep]);
        }
    }, [isHydrated, isOnboardingComplete, completedSteps, router]);

    if (!isHydrated || !hasAccess) {
        return null;
    }

    return <>{children}</>;
}
