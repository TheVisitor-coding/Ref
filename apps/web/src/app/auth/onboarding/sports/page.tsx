'use client';

import { useRouter } from 'next/navigation';
import OnboardingProgressBar from '@/components/molecules/onboarding/OnboardingProgressBar';
import OnboardingGuard from '@/components/molecules/onboarding/OnboardingGuard';
import SportTile from '@/components/molecules/onboarding/SportTile';
import { sportConfig, type SportType } from '@/data/sports/sportsList';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import useOnboardingStore from '@/store/OnboardingStore';

const sportIds = Object.keys(sportConfig) as SportType[];

export default function OnboardingSportsPage() {
    const router = useRouter();
    const { firstName, selectedSports, toggleSport, completeStep } = useOnboardingStore();

    const handleContinue = () => {
        if (selectedSports.length > 0) {
            completeStep(2);
            router.push('/auth/onboarding/athletes-count');
        }
    };

    return (
        <OnboardingGuard step={2}>
            <div className="flex flex-col w-full gap-10">
                <div className="flex flex-col gap-2">
                    <h1 className="text-[40px] font-semibold leading-tight font-poppins">
                        <span className="text-primary-blue font-extrabold italic">Bienvenue {firstName}</span>
                        <br />
                        <span className="text-primary">sélectionnez votre spécialité(s)</span>
                    </h1>
                    <p className="text-base text-secondary">
                        Nous adapterons l&apos;interface et les fonctionnalités à votre sport.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4">
                    {sportIds.map((sportId) => (
                        <SportTile
                            key={sportId}
                            sportId={sportId}
                            selected={selectedSports.includes(sportId)}
                            onToggle={toggleSport}
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between w-full">
                <OnboardingProgressBar currentStep={2} />

                <PrimaryButton
                    onClick={handleContinue}
                    disabled={selectedSports.length === 0}
                    label="Continuer"
                    className="px-6 py-3 text-base font-semibold text-white transition-opacity rounded-xl bg-primary-blue shadow-button disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                />
            </div>
        </OnboardingGuard>
    );
}
