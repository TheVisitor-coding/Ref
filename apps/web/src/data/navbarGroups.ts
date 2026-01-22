export type NavbarLink = {
    title: string;
    icon: string;
    href?: string;
    badge?: string;
    hasSubLinks?: boolean;
};

export type NavbarGroup = {
    id: string;
    heading?: string;
    links: NavbarLink[];
};

export const navbarGroups: NavbarGroup[] = [
    {
        id: 'main',
        links: [
            {
                title: 'Recherche',
                icon: '/icons/Search.svg',
            },
            {
                title: 'Notifications',
                icon: '/icons/Notification.svg',
            },
            {
                title: 'Accueil',
                icon: '/icons/Home.svg',
                href: '/',
            },
        ],
    },
    {
        id: 'athletes',
        heading: 'Mes sportifs',
        links: [
            {
                title: 'Modèles',
                icon: '/icons/Folder.svg',
                href: '/models',
            },
            {
                title: 'Messagerie',
                icon: '/icons/Chat.svg',
                href: '/chat',
            },
            {
                title: 'Sportifs',
                icon: '/icons/Account.svg',
                href: '/athletes',
            },
        ],
    },
    {
        id: 'activity',
        heading: 'Mon activité',
        links: [
            {
                title: 'Agenda',
                icon: '/icons/Calendar.svg',
                href: '/agenda',
            },
            {
                title: 'Facturation',
                icon: '/icons/Wallet.svg',
                href: '/budget',
            },
            {
                title: 'Tâches',
                icon: '/icons/Clipboard.svg',
                badge: 'Bientôt',
            },
        ],
    },
];

export const bottomNavLinks: NavbarLink[] = [
    {
        title: 'Compte',
        icon: '/icons/Account.svg',
        href: '/account',
    },
    {
        title: 'Paramètres',
        icon: '/icons/Settings.svg',
        href: '/settings',
    },
];
