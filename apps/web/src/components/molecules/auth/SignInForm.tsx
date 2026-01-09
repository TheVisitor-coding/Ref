'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import { Button } from '@/components/ui/button';
import { useLogin, useResendConfirmation } from '@/hooks/useAuth';
import { loginSchema, LoginSchemaType } from '@/schema/AuthSchema';
import Link from 'next/link';
import { RefreshCw } from 'lucide-react';

export default function SignInForm() {
    const router = useRouter();
    const [emailNotConfirmed, setEmailNotConfirmed] = useState<string | null>(null);
    const [resendSuccess, setResendSuccess] = useState(false);

    const {
        register: loginField,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: '',
            password: '',
        },
    });

    const { login, isLoading, error } = useLogin({
        onSuccess: () => {
            router.push('/');
        },
        onError: (err) => {
            // Check if error is EmailNotConfirmed
            if (err.message?.includes('not been confirmed') || err.message?.includes('pas été confirmé')) {
                setEmailNotConfirmed(getValues('identifier'));
            } else {
                setEmailNotConfirmed(null);
            }
        },
    });

    const { resend, isLoading: isResending } = useResendConfirmation({
        onSuccess: () => {
            setResendSuccess(true);
            setTimeout(() => setResendSuccess(false), 5000);
        },
    });

    const onSubmit = (data: LoginSchemaType) => {
        setEmailNotConfirmed(null);
        setResendSuccess(false);
        login({
            identifier: data.identifier.trim().toLowerCase(),
            password: data.password,
        });
    };

    const handleResendEmail = () => {
        if (emailNotConfirmed) {
            resend(emailNotConfirmed);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <input
                    type="email"
                    {...loginField('identifier')}
                    placeholder="contact@email.fr"
                    className={`px-4 h-12 rounded-lg border text-base placeholder:text-[#A0A0A0] focus:outline-none focus:border-primary-blue ${errors.identifier ? 'border-red-500' : 'border-[#D3D3D3]'
                        }`}
                    disabled={isLoading}
                    autoComplete="email"
                />
                {errors.identifier && (
                    <span className="text-sm text-red-500">{errors.identifier.message}</span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <input
                    type="password"
                    {...loginField('password')}
                    placeholder="Mot de passe"
                    className={`px-4 h-12 rounded-lg border text-base placeholder:text-[#A0A0A0] focus:outline-none focus:border-primary-blue ${errors.password ? 'border-red-500' : 'border-[#D3D3D3]'
                        }`}
                    disabled={isLoading}
                    autoComplete="new-password"
                />
                {errors.password && (
                    <span className="text-sm text-red-500">{errors.password.message}</span>
                )}

                <Link href="/auth/forgot-password" className="text-sm text-right mt-1 text-secondary underline">
                    Mot de passe oublié ?
                </Link>
            </div>

            <PrimaryButton
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-primary-blue shadow-button text-white text-base"
                label={isLoading ? 'Connexion en cours...' : 'Accéder à mon espace'}
            />

            {/* Email Not Confirmed Error */}
            {emailNotConfirmed && (
                <div className="space-y-3">
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <p className="text-sm text-orange-800 font-medium mb-2">
                            Email non confirmé
                        </p>
                        <p className="text-sm text-orange-700">
                            Votre adresse email n'a pas encore été confirmée. Vérifiez votre boîte mail ou cliquez ci-dessous pour recevoir un nouveau lien.
                        </p>
                    </div>

                    {resendSuccess && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                            ✓ Email de confirmation renvoyé avec succès
                        </div>
                    )}

                    <Button
                        type="button"
                        onClick={handleResendEmail}
                        disabled={isResending}
                        variant="outline"
                        className="w-full"
                    >
                        {isResending ? (
                            <>
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                Envoi en cours...
                            </>
                        ) : (
                            <>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Renvoyer l'email de confirmation
                            </>
                        )}
                    </Button>
                </div>
            )}

            {/* Generic Error */}
            {!emailNotConfirmed && (error || errors.root) && (
                <div className="p-3 text-sm text-red-500 rounded-lg">
                    {errors.root?.message || error || "Une erreur s'est produite"}
                </div>
            )}
        </form>
    );
}
