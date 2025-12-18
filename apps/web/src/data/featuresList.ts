export const FEATURE_IDS = [
    'athletes-tracking',
    'session-analysis',
    'calendar',
    'messaging',
    'payments',
    'tasks',
] as const;

export type FeatureId = (typeof FEATURE_IDS)[number];

export interface FeatureConfig {
    id: FeatureId;
    label: string;
    icon: string;
    href: string;
    onboardingIcon?: string;
}

export const featureConfig: Record<FeatureId, FeatureConfig> = {
    'athletes-tracking': {
        id: 'athletes-tracking',
        label: 'Sportifs',
        icon: '/icons/Account.svg',
        href: '/athletes',
        onboardingIcon: '/sports/Run.svg',
    },
    'session-analysis': {
        id: 'session-analysis',
        label: 'Analyse des séances',
        icon: '/icons/Graph.svg',
        href: '/analysis',
    },
    calendar: {
        id: 'calendar',
        label: 'Planning',
        icon: '/icons/Calendar.svg',
        href: '/planning',
    },
    messaging: {
        id: 'messaging',
        label: 'Messagerie',
        icon: '/icons/Chat.svg',
        href: '/chat',
    },
    payments: {
        id: 'payments',
        label: 'Budget',
        icon: '/icons/Wallet.svg',
        href: '/budget',
    },
    tasks: {
        id: 'tasks',
        label: 'Tâches',
        icon: '/icons/Clipboard.svg',
        href: '/tasks',
    },
};

export const featuresList = Object.values(featureConfig);

export function getFeatureConfig(id: FeatureId): FeatureConfig {
    return featureConfig[id];
}

export function getOnboardingFeatures(): Array<{ id: FeatureId; label: string; icon: string }> {
    return featuresList.map((feature) => ({
        id: feature.id,
        label: feature.id === 'athletes-tracking' ? 'Suivi des sportifs' : feature.label,
        icon: feature.onboardingIcon || feature.icon,
    }));
}

export function getNavbarItemsFromFeatures(selectedFeatures: FeatureId[]) {
    return selectedFeatures
        .map((id) => featureConfig[id])
        .filter((feature): feature is FeatureConfig => feature !== undefined);
}

export function isValidFeatureId(id: string): id is FeatureId {
    return FEATURE_IDS.includes(id as FeatureId);
}
