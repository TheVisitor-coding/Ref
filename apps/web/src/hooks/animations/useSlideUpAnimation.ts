'use client'

import { gsap } from "@/lib/gsap";
import { useLayoutEffect, useRef } from "react"

export const useSlideUpAnimation = (duration: number = 0.8, delay: number = 0.2) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const element = elementRef.current
        if (!element) return

        gsap.set(element, {
            y: "100%",
            opacity: 0,
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            perspective: 1000,
            force3D: true
        })

        const tl = gsap.timeline()
        
        tl.to(element, {
            y: "0%",
            opacity: 1,
            duration,
            delay,
            ease: "power2.out",
            force3D: true,
            onComplete: () => {
                gsap.set(element, { willChange: "auto" })
            }
        })

        return () => {
            tl.kill();
            gsap.set(element, { willChange: "auto" })
        };
    }, [duration, delay])

    return elementRef
}
