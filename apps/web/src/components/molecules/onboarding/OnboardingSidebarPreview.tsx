import Image from 'next/image';

interface OnboardingSidebarPreviewProps {
    firstName?: string;
}

export default function OnboardingSidebarPreview({ firstName }: OnboardingSidebarPreviewProps) {
    return (
        <aside className="flex flex-col w-[275px] h-full gap-10 p-6 bg-white-100 border-r border-grey-light">
            {firstName ? (
                <h2 className="text-lg font-semibold text-primary">{firstName}</h2>
            ) : (
                <div className="h-[23px]" />
            )}

            <nav className="flex flex-col gap-4">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-grey-light">
                    <Image src="/icons/Home.svg" alt="" width={14} height={14} />
                    <span className="text-sm font-medium text-primary">Accueil</span>
                </div>

                <div className="h-px bg-grey-light" />

                <div className="flex flex-col gap-2">
                    <span className="px-3 text-[10px] text-secondary">Mes sportifs</span>
                    <div className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Image src="/icons/Account.svg" alt="" width={14} height={14} />
                            <span className="text-sm text-secondary">Sportifs</span>
                        </div>
                        <Image src="/icons/chevron-right.svg" alt="" width={14} height={14} />
                    </div>
                </div>
            </nav>
        </aside>
    );
}
