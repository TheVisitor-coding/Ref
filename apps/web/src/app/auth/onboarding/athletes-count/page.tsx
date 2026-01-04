'use client';

import { useRouter } from 'next/navigation';
import OnboardingProgressBar from '@/components/molecules/onboarding/OnboardingProgressBar';
import OnboardingGuard from '@/components/molecules/onboarding/OnboardingGuard';
import AthletesCountSlider from '@/components/molecules/onboarding/AthletesCountSlider';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import useOnboardingStore from '@/store/OnboardingStore';

export default function OnboardingAthletesCountPage() {
    const router = useRouter();
    const { athletesCount, setAthletesCount, completeStep } = useOnboardingStore();

    const handleContinue = () => {
        if (athletesCount !== null) {
            completeStep(3);
            router.push('/auth/onboarding/features');
        }
    };

    return (
        <OnboardingGuard step={3}>
            <div className="flex flex-col w-full gap-10">
                <h1 className="text-[40px] font-semibold leading-tight text-primary font-poppins">
                    Combien de sportifs accompagnez-vous ?
                </h1>

                <AthletesCountSlider
                    value={athletesCount ?? 1}
                    onChange={setAthletesCount}
                />
            </div>

            <div className="flex items-center justify-between w-full">
                <OnboardingProgressBar currentStep={3} />

                <PrimaryButton
                    onClick={handleContinue}
                    disabled={athletesCount === null}
                    label="Continuer"
                    className="px-6 py-3 text-base font-semibold text-white transition-opacity rounded-xl bg-primary-blue shadow-button disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                />
            </div>
        </OnboardingGuard>
    );
}
