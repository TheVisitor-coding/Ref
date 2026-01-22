'use client';

import Image from 'next/image';
import Link from 'next/link';

type AthleteAvatar = {
    id: number;
    name: string;
    avatarUrl: string;
    isActive?: boolean;
};

interface AthletesQuickAccessProps {
    isOpen: boolean;
    athletes?: AthleteAvatar[];
}

const MOCK_ATHLETES: AthleteAvatar[] = [
    { id: 1, name: 'Athlète 1', avatarUrl: '/users/profilePic.png', isActive: false },
    { id: 2, name: 'Athlète 2', avatarUrl: '/users/profilePic.png', isActive: true },
    { id: 3, name: 'Athlète 3', avatarUrl: '/users/profilePic.png', isActive: false },
    { id: 4, name: 'Athlète 4', avatarUrl: '/users/profilePic.png', isActive: false },
    { id: 5, name: 'Athlète 5', avatarUrl: '/users/profilePic.png', isActive: false },
    { id: 6, name: 'Athlète 6', avatarUrl: '/users/profilePic.png', isActive: false },
    { id: 7, name: 'Athlète 7', avatarUrl: '/users/profilePic.png', isActive: false },
    { id: 8, name: 'Athlète 8', avatarUrl: '/users/profilePic.png', isActive: false },
];

function AthletesQuickAccess({ isOpen, athletes = MOCK_ATHLETES }: AthletesQuickAccessProps) {
    if (!isOpen) return null;

    const displayedAthletes = athletes.slice(0, 8);

    return (
        <div className="w-full px-3 py-2 flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 w-full">
                {displayedAthletes.map((athlete) => (
                    <Link
                        key={athlete.id}
                        href={`/athletes/${athlete.id}`}
                        className="relative rounded-lg overflow-hidden"
                        style={{
                            flex: '0 0 calc(25% - 6px)',
                            aspectRatio: '1',
                            maxWidth: '50px',
                            maxHeight: '50px',
                            minWidth: '36px',
                            minHeight: '36px',
                        }}
                        title={athlete.name}
                    >
                        <Image
                            src={athlete.avatarUrl}
                            alt={athlete.name}
                            fill
                            className="object-cover"
                            sizes="50px"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default AthletesQuickAccess;
