'use client';

import { useRouter } from 'next/navigation';
import OnboardingProgressBar from '@/components/molecules/onboarding/OnboardingProgressBar';
import FeatureTile from '@/components/molecules/onboarding/FeatureTile';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import useOnboardingStore, { type FeatureId } from '@/store/OnboardingStore';

interface Feature {
    id: FeatureId;
    label: string;
    icon: string;
}

const features: Feature[] = [
    { id: 'athletes-tracking', label: 'Suivi des sportifs', icon: '/sports/Run.svg' },
    { id: 'session-analysis', label: 'Analyse des séances', icon: '/icons/Panel.svg' },
    { id: 'calendar', label: 'Agenda personnel', icon: '/icons/Calendar.svg' },
    { id: 'messaging', label: 'Messagerie', icon: '/icons/Chat.svg' },
    { id: 'payments', label: 'Gestion des paiement', icon: '/icons/Wallet.svg' },
    { id: 'tasks', label: 'Gestion des tâches', icon: '/icons/Clipboard.svg' },
];

export default function OnboardingFeaturesPage() {
    const router = useRouter();
    const { selectedFeatures, toggleFeature } = useOnboardingStore();

    const handleContinue = () => {
        router.push('/auth/sign-up');
    };

    return (
        <>
            <div className="flex flex-col w-full gap-10">
                <div className="flex flex-col gap-2">
                    <h1 className="text-[40px] font-semibold leading-tight text-primary font-poppins">
                        De quels outils
                        <br />
                        avez-vous besoin ?
                    </h1>
                    <p className="text-base text-secondary">
                        Sélectionnez les modules dont vous avez besoin. Avec Ref. vous ne payez que les fonctionnalités que vous utilisez 😉.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {[0, 1, 2].map((rowIndex) => (
                        <div key={rowIndex} className="flex gap-4">
                            {features.slice(rowIndex * 2, rowIndex * 2 + 2).map((feature) => (
                                <FeatureTile
                                    key={feature.id}
                                    icon={feature.icon}
                                    label={feature.label}
                                    selected={selectedFeatures.includes(feature.id)}
                                    onToggle={() => toggleFeature(feature.id)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between w-full">
                <OnboardingProgressBar currentStep={4} />

                <PrimaryButton
                    onClick={handleContinue}
                    label="Continuer"
                    className="px-6 py-3 text-base font-semibold text-white transition-opacity rounded-xl bg-primary-blue shadow-button hover:opacity-90"
                />
            </div>
        </>
    );
}
