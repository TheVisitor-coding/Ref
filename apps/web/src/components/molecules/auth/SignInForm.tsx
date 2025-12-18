'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PrimaryButton from '@/components/atoms/buttons/PrimaryButton';
import SignUpGuard from '@/components/molecules/onboarding/SignUpGuard';
import { useLogin } from '@/hooks/useAuth';
import { loginSchema, LoginSchemaType } from '@/schema/AuthSchema';
import Link from 'next/link';

export default function SignInForm() {
    const router = useRouter();

    const {
        register: loginField,
        handleSubmit,
        formState: { errors },
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
        }
    })

    const onSubmit = (data: LoginSchemaType) => {
        login({
            identifier: data.identifier.trim().toLowerCase(),
            password: data.password,
        });
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

            {(error || errors.root) && (
                <div className="p-3 text-sm text-red-500 rounded-lg">
                    {errors.root?.message || error || "Une erreur s'est produite"}
                </div>
            )}
        </form>
    );
}
