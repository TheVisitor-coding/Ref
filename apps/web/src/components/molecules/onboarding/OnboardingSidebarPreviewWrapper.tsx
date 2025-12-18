'use client';

import OnboardingSidebarPreview from './OnboardingSidebarPreview';
import useOnboardingStore from '@/store/OnboardingStore';

export default function OnboardingSidebarPreviewWrapper() {
    const { firstName, selectedSports, selectedFeatures, athletesCount } = useOnboardingStore();

    return <OnboardingSidebarPreview firstName={firstName || undefined} />;
}
