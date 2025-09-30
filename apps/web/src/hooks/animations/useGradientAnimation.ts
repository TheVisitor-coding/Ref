import { gsap } from "@/lib/gsap";
import { useLayoutEffect, useRef } from "react";

export const useGradientAnimation = () => {
    const backgroundRef = useRef<HTMLDivElement>(null);
    const backgroundAccentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const background = backgroundRef.current;
        const backgroundAccent = backgroundAccentRef.current;
        if (!background || !backgroundAccent) return;

        gsap.set(background, {
            y: '-20%',
            scale: 0,
            transformOrigin: 'bottom'
        })

        gsap.to(background, {
            y: '0%',
            scale: 1,
            duration: 1,
            ease: 'power2.out',
        })

        gsap.set(backgroundAccent, {
            y: '-20%',
            scale: 0,
            transformOrigin: 'bottom'
        })

        gsap.to(backgroundAccent, {
            y: '0%',
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
        })

    }, []);

    return { backgroundRef, backgroundAccentRef };
}