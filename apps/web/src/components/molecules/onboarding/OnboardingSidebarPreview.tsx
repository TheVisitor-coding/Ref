import Image from 'next/image';
import SportTagsAnimation from './SportTagsAnimation';
import type { SportType } from '@/data/sports/sportsList';
import NavLinkButton from '@/components/atoms/buttons/NavLinkBtn';
import { getNavbarItemsFromFeatures, type FeatureId } from '@/data/featuresList';

interface OnboardingSidebarPreviewProps {
    firstName?: string;
    selectedSports?: SportType[];
    selectedFeatures?: FeatureId[];
}

export default function OnboardingSidebarPreview({ firstName, selectedSports = [], selectedFeatures = [] }: OnboardingSidebarPreviewProps) {
    const features = getNavbarItemsFromFeatures(selectedFeatures);

    return (
        <div className="relative flex w-full h-full">
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
                        <NavLinkButton hasSubLinks isOpen href={""} src='/icons/Account.svg' alt="Account Icon">
                            Sportifs
                        </NavLinkButton>

                        {features
                            .filter((feature) => feature.id !== 'athletes-tracking')
                            .map((feature) => (
                                <NavLinkButton isOpen href={feature.href} src={feature.icon} alt={`${feature.label} Icon`} key={feature.id}>
                                    {feature.label}
                                </NavLinkButton>
                            ))}
                    </div>
                </nav>
            </aside>

            <div className="relative flex-1 bg-white">
                <SportTagsAnimation selectedSports={selectedSports} />
            </div>
        </div>
    );
}
