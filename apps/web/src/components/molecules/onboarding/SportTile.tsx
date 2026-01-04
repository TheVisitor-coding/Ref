'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { SportType } from '@/data/sports/sportsList';
import { sportConfig } from '@/data/sports/sportsList';
import { Skeleton } from '@/components/ui/skeleton';

interface SportTileProps {
    sportId: SportType;
    selected: boolean;
    onToggle: (id: SportType) => void;
}

export default function SportTile({ sportId, selected, onToggle }: SportTileProps) {
    const sport = sportConfig[sportId];
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <button
            type="button"
            onClick={() => onToggle(sportId)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition-colors ${selected
                ? 'border-primary-blue bg-primary-blue-light'
                : 'border-grey-button hover:border-secondary'
                }`}
        >
            <div className="relative w-6 h-6">
                {!imageLoaded && <Skeleton className="absolute inset-0 rounded" />}
                <Image
                    src={sport.icon}
                    alt=""
                    width={24}
                    height={24}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    className={`transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>
            <span className={`text-base ${selected ? 'text-primary-blue' : 'text-primary'}`}>{sport.label}</span>
        </button>
    );
}
