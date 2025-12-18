'use client';

import { useRouter } from 'next/navigation';
import OnboardingProgressBar from '@/components/molecules/onboarding/OnboardingProgressBar';
import OnboardingGuard from '@/components/molecules/onboarding/OnboardingGuard';
import SelectionTile from '@/components/molecules/onboarding/SelectionTile';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import useOnboardingStore, { type AthletesCountOption } from '@/store/OnboardingStore';

const athletesCountOptions: { id: AthletesCountOption; label: string }[] = [
    { id: 'less-than-5', label: 'Moins de 5' },
    { id: '5-to-20', label: 'Entre 5 et 20' },
    { id: '20-to-50', label: 'Entre 20 et 50' },
    { id: 'more-than-50', label: 'Plus de 50' },
];

export default function OnboardingAthletesCountPage() {
    const router = useRouter();
    const { athletesCount, setAthletesCount, completeStep } = useOnboardingStore();

    const handleContinue = () => {
        if (athletesCount) {
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

                <div className="flex flex-col gap-4">
                    {athletesCountOptions.map((option) => (
                        <SelectionTile
                            key={option.id}
                            icon="/sports/Run.svg"
                            label={option.label}
                            selected={athletesCount === option.id}
                            onClick={() => setAthletesCount(option.id)}
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between w-full">
                <OnboardingProgressBar currentStep={3} />

                <PrimaryButton
                    onClick={handleContinue}
                    disabled={!athletesCount}
                    label="Continuer"
                    className="px-6 py-3 text-base font-semibold text-white transition-opacity rounded-xl bg-primary-blue shadow-button disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                />
            </div>
        </OnboardingGuard>
    );
}
