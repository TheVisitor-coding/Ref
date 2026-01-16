'use client';

import { useState, useEffect, useRef } from 'react';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useResendConfirmation } from '@/hooks/useAuth';
import Link from 'next/link';

interface EmailSentMessageProps {
    email: string;
}

export default function EmailSentMessage({ email }: EmailSentMessageProps) {
    const [countdown, setCountdown] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const { resend, isLoading, error, isSuccess } = useResendConfirmation({
        onSuccess: () => {
            setCountdown(60);
            // Clear any existing interval
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            intervalRef.current = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                            intervalRef.current = null;
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        },
        onError: (err) => {
            console.error('Resend email error:', err);
        },
    });

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const handleResend = () => {
        if (countdown === 0 && !isLoading) {
            resend(email);
        }
    };

    return (
        <div className="w-full max-w-md space-y-6 text-center">
            {/* Icon */}
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-600" />
            </div>

            {/* Title */}
            <div className="space-y-2">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Vérifiez votre boîte mail
                </h1>
                <p className="text-gray-600">
                    Nous avons envoyé un lien de confirmation à
                </p>
                <p className="font-medium text-gray-900">{email}</p>
            </div>

            {/* Instructions */}
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 text-left space-y-2">
                <p className="font-medium">Pour activer votre compte :</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Ouvrez l&apos;email de confirmation</li>
                    <li>Cliquez sur le lien de vérification</li>
                    <li>Vous serez automatiquement connecté</li>
                </ol>
            </div>

            {/* Success Message */}
            {isSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
                    ✓ Email renvoyé avec succès ! Vérifiez votre boîte de réception.
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                    ⚠️ {error}
                </div>
            )}

            {/* Countdown info */}
            {countdown > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                    ⏱️ Vous pourrez renvoyer un email dans {countdown} seconde{countdown > 1 ? 's' : ''}.
                </div>
            )}

            {/* Resend Button */}
            <Button
                onClick={handleResend}
                disabled={isLoading || countdown > 0}
                variant="outline"
                className="w-full"
            >
                {isLoading ? (
                    <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                    </>
                ) : countdown > 0 ? (
                    <>Renvoyer dans {countdown}s</>
                ) : (
                    <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Renvoyer l&apos;email
                    </>
                )}
            </Button>

            {/* Back to Login */}
            <div className="pt-4">
                <Link href="/auth/sign-in" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à la connexion
                </Link>
            </div>

            {/* Help Text */}
            <p className="text-xs text-gray-500">
                Vous n&apos;avez pas reçu l&apos;email ? Vérifiez vos spams ou utilisez le bouton ci-dessus.
            </p>
        </div>
    );
}
