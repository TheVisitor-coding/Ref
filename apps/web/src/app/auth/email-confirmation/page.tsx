'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEmailConfirmation } from '@/hooks/useAuth';
import Image from 'next/image';

export default function EmailConfirmationPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('confirmation');
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [errorMessage, setErrorMessage] = useState('');
    const [redirectCountdown, setRedirectCountdown] = useState(3);

    const { confirm, isLoading, error, isSuccess } = useEmailConfirmation(token || '', {
        onSuccess: () => {
            setStatus('success');
            // Countdown visuel avant redirection
            let count = 3;
            const countdownInterval = setInterval(() => {
                count -= 1;
                setRedirectCountdown(count);
                if (count <= 0) {
                    clearInterval(countdownInterval);
                    router.push('/');
                }
            }, 1000);
        },
        onError: (err) => {
            setStatus('error');
            setErrorMessage(err);
        },
    });

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setErrorMessage('Token de confirmation manquant');
            return;
        }

        // Trigger confirmation automatiquement
        confirm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Ne déclencher qu'une seule fois au montage

    const handleRetry = () => {
        if (token) {
            setStatus('loading');
            confirm();
        }
    };

    const handleGoToLogin = () => {
        router.push('/auth/sign-in');
    };

    const handleGoHome = () => {
        router.push('/');
    };

    return (
        <main className="w-full h-screen p-20 flex items-center justify-center bg-white">
            <Image
                src="/ref_logo.svg"
                alt="Ref Logo"
                width={133}
                height={39}
                className="absolute top-8 left-8"
                priority
            />

            <div className="w-full max-w-md space-y-6 text-center">
                {status === 'loading' && (
                    <>
                        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Confirmation en cours...
                            </h1>
                            <p className="text-gray-600">
                                Veuillez patienter pendant que nous vérifions votre email.
                            </p>
                        </div>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Email confirmé !
                            </h1>
                            <p className="text-gray-600">
                                Votre compte a été activé avec succès.
                            </p>
                            <p className="text-gray-500 text-sm">
                                Redirection dans {redirectCountdown} seconde{redirectCountdown > 1 ? 's' : ''}...
                            </p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
                            ✓ Vous êtes maintenant connecté
                        </div>
                        <Button
                            onClick={handleGoHome}
                            className="w-full"
                        >
                            Accéder à mon espace maintenant
                        </Button>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                            <XCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Erreur de confirmation
                            </h1>
                            <p className="text-gray-600">
                                {errorMessage || 'Le lien de confirmation est invalide ou a expiré.'}
                            </p>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
                            {errorMessage.includes('expired') || errorMessage.includes('expiré') ? (
                                <p>
                                    Le lien a expiré. Veuillez vous connecter pour recevoir un nouveau lien de confirmation.
                                </p>
                            ) : errorMessage.includes('already confirmed') || errorMessage.includes('déjà confirmé') ? (
                                <p>
                                    Votre email est déjà confirmé. Vous pouvez vous connecter.
                                </p>
                            ) : (
                                <p>
                                    Une erreur s'est produite. Veuillez réessayer ou contacter le support.
                                </p>
                            )}
                        </div>
                        <div className="space-y-3">
                            {token && !errorMessage.includes('already confirmed') && (
                                <Button
                                    onClick={handleRetry}
                                    disabled={isLoading}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Réessayer
                                </Button>
                            )}
                            <Button
                                onClick={handleGoToLogin}
                                className="w-full"
                            >
                                Aller à la connexion
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
