'use client'

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import PreDashboardModal from "@/components/molecules/modal/preDashboardModal";

function PreDashboard() {
    const backgroundRef = useRef<HTMLDivElement>(null);
    const backgroundAccentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const background = backgroundRef.current;
        const backgroundAccent = backgroundAccentRef.current;
        if (!background || !backgroundAccent) return;

        gsap.set(background, {
            y: '-20%',
            scale: 0,
        })

        gsap.to(background, {
            y: '0%',
            scale: 1,
            duration: 2,
            ease: 'power2.out',
        })

        gsap.set(backgroundAccent, {
            y: '-20%',
            scale: 0,
        })

        gsap.to(backgroundAccent, {
            y: '0%',
            scale: 1,
            duration: 3,
            ease: 'power2.out',
        })

    }, []);

    return (
        <div className="w-full h-full relative overflow-hidden">
            <div
                className="absolute right-0 w-full h-full -bottom-2/5"
            >
                <div
                    ref={backgroundAccentRef}
                    className="absolute top-[40%] w-full h-2/5 bg-accent rounded-[50%] blur-[250px]"
                />

                <div
                    ref={backgroundRef}
                    className="absolute -bottom-1/5 w-full h-3/5 bg-primary-blue rounded-[50%] blur-[150px]"
                />
            </div>

            <div className="w-full h-full relative z-10 flex flex-col justify-between items-center px-10 pt-8">
                <div className="w-full flex justify-end">
                    <button className="cursor-pointer px-3 py-1 rounded-lg border-b-2 border-[1px] border-grey-button transition-all hover:-translate-y-0.5">
                        Fermer
                    </button>
                </div>

                <PreDashboardModal />

            </div>
        </div>
    );
}

export default PreDashboard;
