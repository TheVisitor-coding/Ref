'use client';

import { useRouter } from 'next/navigation';
import OnboardingProgressBar from '@/components/molecules/onboarding/OnboardingProgressBar';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import useOnboardingStore from '@/store/OnboardingStore';

export default function OnboardingNamePage() {
    const router = useRouter();
    const { firstName, setFirstName } = useOnboardingStore();

    const handleContinue = () => {
        if (firstName.trim()) {
            router.push('/auth/onboarding/sports');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && firstName.trim()) {
            handleContinue();
        }
    };

    return (
        <>
            <div className="flex flex-col w-full gap-10">
                <h1 className="text-[40px] font-semibold leading-tight text-primary font-poppins">
                    Configurons votre espace, quel est votre prénom ?
                </h1>

                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Prénom"
                    className="w-full h-12 px-4 text-sm border rounded-lg border-grey-button placeholder:text-disabled focus:outline-none focus:border-primary-blue"
                    autoFocus
                />
            </div>

            <div className="flex items-center justify-between w-full">
                <OnboardingProgressBar currentStep={1} />

                <PrimaryButton
                    onClick={handleContinue}
                    disabled={!firstName.trim()}
                    label="Continuer"
                    className="px-6 py-3 text-base font-semibold text-white transition-opacity rounded-xl bg-primary-blue shadow-button disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                />
            </div>
        </>
    );
}
