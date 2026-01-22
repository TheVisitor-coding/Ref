'use client';

import { useRef, useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { sportConfig, type SportType } from '@/data/sports/sportsList';

interface SportTagsAnimationProps {
    selectedSports: SportType[];
}

const tagPositions: Record<SportType, { top: string; right: string; }> = {
    running: { top: '60px', right: '20px' },
    cycling: { top: '380px', right: '40px' },
    swimming: { top: '220px', right: '60px' },
};

export default function SportTagsAnimation({ selectedSports }: SportTagsAnimationProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const tagsRef = useRef<Map<SportType, HTMLDivElement>>(new Map());
    const previousSportsRef = useRef<Set<SportType>>(new Set());

    useLayoutEffect(() => {
        const currentSports = new Set(selectedSports);
        const previousSports = previousSportsRef.current;

        const addedSports = selectedSports.filter((sport) => !previousSports.has(sport));

        const removedSports = Array.from(previousSports).filter((sport) => !currentSports.has(sport));

        addedSports.forEach((sport) => {
            const tagEl = tagsRef.current.get(sport);
            if (tagEl) {
                gsap.fromTo(
                    tagEl,
                    {
                        opacity: 0,
                        scale: 0.5,
                        y: 30,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'back.out(1.7)',
                    }
                );
            }
        });

        removedSports.forEach((sport) => {
            const tagEl = tagsRef.current.get(sport);
            if (tagEl) {
                gsap.to(tagEl, {
                    opacity: 0,
                    scale: 0.5,
                    y: -20,
                    duration: 0.3,
                    ease: 'power2.in',
                });
            }
        });

        previousSportsRef.current = currentSports;
    }, [selectedSports]);

    useEffect(() => {
        if (selectedSports.length > 0) {
            selectedSports.forEach((sport, index) => {
                const tagEl = tagsRef.current.get(sport);
                if (tagEl) {
                    gsap.fromTo(
                        tagEl,
                        {
                            opacity: 0,
                            scale: 0.5,
                            y: 30,
                        },
                        {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            duration: 0.5,
                            delay: index * 0.1,
                            ease: 'back.out(1.7)',
                        }
                    );
                }
            });
        }
    }, [selectedSports]);

    const setTagRef = (sport: SportType) => (el: HTMLDivElement | null) => {
        if (el) {
            tagsRef.current.set(sport, el);
        } else {
            tagsRef.current.delete(sport);
        }
    };

    const allSportTypes = Object.keys(sportConfig) as SportType[];

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
            {allSportTypes.map((sport) => {
                const config = sportConfig[sport];
                const position = tagPositions[sport];
                const isSelected = selectedSports.includes(sport);

                return (
                    <div
                        key={sport}
                        ref={setTagRef(sport)}
                        className="absolute flex items-center gap-3 px-6 py-3 rounded-xl"
                        style={{
                            top: position.top,
                            right: position.right,
                            backgroundColor: config.tagBgColor,
                            opacity: isSelected ? 1 : 0,
                            pointerEvents: 'none',
                        }}
                    >
                        <div
                            className="flex items-center justify-center w-8 h-8 rounded-lg"
                            style={{ backgroundColor: config.tagBgColor }}
                        >
                            <Image
                                src={config.icon}
                                alt={config.label}
                                width={24}
                                height={24}
                                className="opacity-90"
                            />
                        </div>
                        <span
                            className="text-xl font-bold italic uppercase tracking-wide"
                            style={{
                                color: config.tagTextColor,
                                fontFamily: "'Hanken Grotesk', sans-serif",
                            }}
                        >
                            {config.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
