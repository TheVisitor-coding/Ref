'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface AnimatedRoleTextProps {
    roles: string[];
    className?: string;
}

export default function AnimatedRoleText({ roles, className = '' }: Readonly<AnimatedRoleTextProps>) {
    const containerRef = useRef<HTMLSpanElement>(null);
    const activeIndex = useRef(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = containerRef.current?.querySelectorAll('.word');
            if (!words || words.length === 0) return;

            words.forEach((word, i) => {
                const letters = word.querySelectorAll('.letter');
                if (i === 0) {
                    gsap.set(letters, { y: '0%' });
                } else {
                    gsap.set(letters, { y: '100%' });
                }
            });

            const animate = () => {
                const nextIndex = (activeIndex.current + 1) % roles.length;

                const currentWord = words[activeIndex.current];
                const nextWord = words[nextIndex];

                const currentLetters = currentWord.querySelectorAll('.letter');
                const nextLetters = nextWord.querySelectorAll('.letter');

                gsap.set(nextLetters, { y: '100%' });

                const tl = gsap.timeline({
                    onComplete: () => {
                        activeIndex.current = nextIndex;
                    }
                });

                tl.to(currentLetters, {
                    y: '-100%',
                    duration: 0.8,
                    stagger: 0.03,
                    ease: 'power3.inOut'
                })
                    .to(nextLetters, {
                        y: '0%',
                        duration: 0.8,
                        stagger: 0.03,
                        ease: 'power3.inOut'
                    }, "<0.1");
            };

            const interval = setInterval(animate, 3000);
            return () => clearInterval(interval);
        }, containerRef);

        return () => ctx.revert();
    }, [roles]);

    const longestRole = [...roles].sort((a, b) => b.length - a.length)[0];

    return (
        <span ref={containerRef} className={`relative inline-flex overflow-hidden align-top ${className}`}>
            <span className="invisible opacity-0">{longestRole}</span>

            {roles.map((role, i) => (
                <span key={i} className="word absolute top-0 left-0 flex whitespace-nowrap">
                    {role.split('').map((char, j) => (
                        <span
                            key={j}
                            className={`letter inline-block ${i === 0 ? '' : 'translate-y-full'}`}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </span>
            ))}
        </span>
    );
}
