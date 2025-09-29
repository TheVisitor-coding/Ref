'use client'

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useSlideUpAnimation } from "@/hooks/animations/useSlideUpAnimation";

function PreDashboard() {
    const modalRef = useSlideUpAnimation(0.8, 0.5)
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

                <div
                    ref={modalRef}
                    className="max-w-3xl bg-white w-full h-fit max-h-[38rem] min-h-96 rounded-t-3xl outline-[12px] outline-white/20 relative overflow-y-auto"
                >
                    {/* Head Modal */}
                    <div className="p-10">
                        <p className="text-secondary text-[1.125rem] leading-tight">Bonjour</p>
                        <h1 className="text-primary text-[2.5rem] font-semibold">Prénom</h1>
                        <div className="flex gap-2 text-base text-secondary items-center">
                            <p>Depuis votre dernière connexion, vous avez</p>
                            <span className="flex items-center gap-2 px-2 py-1 bg-white-100 rounded-lg">
                                <img src={"/icons/chat.svg"} alt="chat icon" />
                                <p>17 messages</p>
                            </span>
                            <p>et</p>
                            <span className="flex items-center gap-2 px-2 py-1 bg-white-100 rounded-lg">
                                <img src={"/icons/chat.svg"} alt="chat icon" />
                                <p>2 urgences à traiter</p>
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 px-10 pb-10">
                        {/* Tag */}
                        <span className="px-2 py-1 bg-error-50 w-fit text-error rounded-lg">Urgent</span>

                        <div className="flex flex-col p-2 bg-white-100 rounded-2xl">
                            <div className="p-4">
                                <h3>Théo demande de déplacer sa séance de 11h.</h3>
                                <p>Vous êtes tous les deux disponibles à 16h. Je peux modifier la séance dans vos 2 plannings.</p>
                            </div>

                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreDashboard;
