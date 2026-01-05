'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import SignUpGuard from '@/components/molecules/onboarding/SignUpGuard';
import { useRegister } from '@/hooks/useAuth';
import useOnboardingStore from '@/store/OnboardingStore';
import { signupFormSchema, type SignupFormSchemaType } from '@/schema/AuthSchema';

export default function SignUpForm() {
    const router = useRouter();
    const { getOnboardingData, reset: resetOnboarding } = useOnboardingStore();

    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormSchemaType>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { register, isLoading, error } = useRegister({
        onSuccess: async () => {
            await resetOnboarding();
            // toast.success('Compte créé avec succès ! Création de votre espace en cours...');
            router.push('/');
        },
    });

    const onSubmit = (data: SignupFormSchemaType) => {
        const onboardingData = getOnboardingData();

        if (!onboardingData.firstName || onboardingData.athletesCount === null) {
            router.push('/auth/onboarding');
            return;
        }

        register({
            email: data.email.trim().toLowerCase(),
            password: data.password,
            onboardingData: {
                firstName: onboardingData.firstName,
                selectedSports: onboardingData.selectedSports,
                athletesCount: onboardingData.athletesCount,
                selectedFeatures: onboardingData.selectedFeatures,
            },
        });
    };

    return (
        <SignUpGuard>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <input
                        type="email"
                        {...registerField('email')}
                        placeholder="contact@email.fr"
                        className={`px-4 h-12 rounded-lg border text-base placeholder:text-[#A0A0A0] focus:outline-none focus:border-primary-blue ${errors.email ? 'border-red-500' : 'border-[#D3D3D3]'
                            }`}
                        disabled={isLoading}
                        autoComplete="email"
                    />
                    {errors.email && (
                        <span className="text-sm text-red-500">{errors.email.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <input
                        type="password"
                        {...registerField('password')}
                        placeholder="Mot de passe"
                        className={`px-4 h-12 rounded-lg border text-base placeholder:text-[#A0A0A0] focus:outline-none focus:border-primary-blue ${errors.password ? 'border-red-500' : 'border-[#D3D3D3]'
                            }`}
                        disabled={isLoading}
                        autoComplete="new-password"
                    />
                    {errors.password && (
                        <span className="text-sm text-red-500">{errors.password.message}</span>
                    )}
                </div>

                <PrimaryButton
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-primary-blue shadow-button text-white text-base"
                    label={isLoading ? 'Création en cours...' : 'Créer mon compte'}
                />

                {(error || errors.root) && (
                    <div className="p-3 text-sm text-red-500 rounded-lg">
                        {errors.root?.message || (error as Error)?.message || "Une erreur s'est produite"}
                    </div>
                )}

                <p className="text-sm text-grey">
                    En continuant, vous acceptez les{' '}
                    <a className="underline hover:text-primary-blue" href="#">
                        conditions générales d&apos;utilisations
                    </a>
                </p>
            </form>
        </SignUpGuard>
    );
}
