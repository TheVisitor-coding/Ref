import Image from 'next/image';
import type { SportType } from '@/data/sports/sportsList';
import { sportConfig } from '@/data/sports/sportsList';

interface SportTileProps {
    sportId: SportType;
    selected: boolean;
    onToggle: (id: SportType) => void;
}

export default function SportTile({ sportId, selected, onToggle }: SportTileProps) {
    const sport = sportConfig[sportId];
    return (
        <button
            type="button"
            onClick={() => onToggle(sportId)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition-colors ${selected
                ? 'border-primary-blue bg-primary-blue-light'
                : 'border-grey-button hover:border-secondary'
                }`}
        >
            <Image src={sport.icon} alt="" width={24} height={24} />
            <span className={`text-base ${selected ? 'text-primary-blue' : 'text-primary'}`}>{sport.label}</span>
        </button>
    );
}
