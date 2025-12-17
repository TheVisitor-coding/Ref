import Image from 'next/image';
import Link from 'next/link';
import OnboardingSidebarPreview from '@/components/molecules/onboarding/OnboardingSidebarPreview';

interface OnboardingLayoutProps {
    children: React.ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
    return (
        <main className="flex w-full min-h-screen bg-white">
            <div className="relative flex flex-col w-1/2 min-h-screen p-20">
                <Image
                    src="/ref_logo.svg"
                    alt="Ref Logo"
                    width={133}
                    height={39}
                    className="absolute top-8 left-8"
                    priority
                />

                <div className="flex flex-col items-start justify-center flex-1 w-full max-w-[550px] mx-auto gap-16">
                    {children}
                </div>

                <p className="absolute text-sm text-disabled left-20 bottom-8">
                    Déjà un compte ?{' '}
                    <Link href="/auth/sign-in" className="underline hover:text-primary">
                        Me connecter
                    </Link>
                </p>
            </div>

            <div className="flex items-center justify-center w-1/2 min-h-screen px-[120px] py-20 bg-primary-blue-light">
                <div className="w-[650px] h-[600px] bg-white rounded-l-3xl shadow-authContainer overflow-hidden">
                    <OnboardingSidebarPreview />
                </div>
            </div>
        </main>
    );
}
