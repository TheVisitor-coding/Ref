'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useOnboardingStore, { type OnboardingStep } from '@/store/OnboardingStore';
import {
    OnboardingStepSkeleton,
    OnboardingSliderSkeleton,
    OnboardingFeaturesSkeleton,
} from './OnboardingSkeleton';

interface OnboardingGuardProps {
    step: OnboardingStep;
    children: React.ReactNode;
}

const stepRoutes: Record<OnboardingStep, string> = {
    1: '/auth/onboarding',
    2: '/auth/onboarding/sports',
    3: '/auth/onboarding/athletes-count',
    4: '/auth/onboarding/features',
};

function SkeletonForStep({ step }: { step: OnboardingStep }) {
    switch (step) {
        case 2:
            return <OnboardingStepSkeleton />;
        case 3:
            return <OnboardingSliderSkeleton />;
        case 4:
            return <OnboardingFeaturesSkeleton />;
        default:
            return <OnboardingStepSkeleton />;
    }
}

export default function OnboardingGuard({ step, children }: OnboardingGuardProps) {
    const router = useRouter();
    const { canAccessStep, completedSteps } = useOnboardingStore();
    const [isHydrated, setIsHydrated] = useState(false);
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (!isHydrated) return;

        const access = canAccessStep(step);
        setHasAccess(access);

        if (!access) {
            const firstIncompleteStep = ([1, 2, 3, 4] as OnboardingStep[]).find(
                (s) => !completedSteps.includes(s)
            ) ?? 1;

            router.replace(stepRoutes[firstIncompleteStep]);
        }
    }, [isHydrated, step, canAccessStep, completedSteps, router]);

    if (!isHydrated || !hasAccess) {
        return <SkeletonForStep step={step} />;
    }

    return <>{children}</>;
}
