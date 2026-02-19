import EmailSentMessage from '@/components/molecules/auth/EmailSentMessage';
import Image from 'next/image';

interface CheckEmailPageProps {
    searchParams: Promise<{ email?: string }>;
}

export default async function CheckEmailPage({ searchParams }: CheckEmailPageProps) {
    const params = await searchParams;
    const email = params.email || '';

    if (!email) {
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
                <div className="text-center">
                    <p className="text-gray-600">Email manquant. Veuillez recommencer l&apos;inscription.</p>
                </div>
            </main>
        );
    }

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
            <EmailSentMessage email={email} />
        </main>
    );
}
