'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingProgressBar from '@/components/molecules/onboarding/OnboardingProgressBar';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import useOnboardingStore from '@/store/OnboardingStore';

const FIRSTNAME_REGEX = /^[a-zA-Z\u00C0-\u017F\s'-]*$/;

export default function OnboardingNamePage() {
    const router = useRouter();
    const { firstName, setFirstName, completeStep } = useOnboardingStore();
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === '' || FIRSTNAME_REGEX.test(value)) {
            setFirstName(value);
            setError(null);
        } else {
            setError('Le prénom ne peut contenir que des lettres');
        }
    };

    const handleContinue = () => {
        if (firstName.trim() && FIRSTNAME_REGEX.test(firstName)) {
            completeStep(1);
            router.push('/auth/onboarding/sports');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && firstName.trim()) {
            handleContinue();
        }
    };

    const isValidFirstName = firstName.trim().length > 0 && FIRSTNAME_REGEX.test(firstName);

    return (
        <>
            <div className="flex flex-col w-full gap-10">
                <h1 className="text-[40px] font-semibold leading-tight text-primary font-poppins">
                    Configurons votre espace, quel est votre prénom ?
                </h1>

                <div className="flex flex-col gap-1">
                    <input
                        type="text"
                        value={firstName}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Prénom"
                        className={`w-full h-12 px-4 text-sm border rounded-lg placeholder:text-disabled focus:outline-none focus:border-primary-blue ${error ? 'border-red-500' : 'border-grey-button'
                            }`}
                        autoFocus
                        maxLength={50}
                    />
                    {error && (
                        <span className="text-sm text-red-500">{error}</span>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between w-full">
                <OnboardingProgressBar currentStep={1} />

                <PrimaryButton
                    onClick={handleContinue}
                    disabled={!isValidFirstName}
                    label="Continuer"
                    className="px-6 py-3 text-base font-semibold text-white transition-opacity rounded-xl bg-primary-blue shadow-button disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                />
            </div>
        </>
    );
}
