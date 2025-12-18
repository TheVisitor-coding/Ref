import { sidebarFeatures } from './featuresList';

export const navbarItems = [
    ...sidebarFeatures.map((feature) => ({
        title: feature.label,
        icon: feature.icon,
        href: feature.href,
        featureId: feature.id,
    })),
    {
        title: 'Modèles',
        icon: '/icons/Folder.svg',
        href: '/models',
        featureId: null,
    },
] as {
    title: string;
    icon: string;
    href: string;
    featureId: string | null;
}[];
