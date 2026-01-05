'use client';

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import NavbarDivider from "@/components/atoms/divider/NavbarDivider";
import SignUpForm from "@/components/molecules/auth/SignUpForm";
import AuthList from "@/components/molecules/list/AuthList";
import TestimonyCard from "@/components/molecules/testimony/testimonyCard";

function Register() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".animate-enter",
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    delay: 0.1
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div className="p-20 flex justify-center items-center w-1/2 h-screen">
                <div ref={containerRef} className="flex flex-col gap-10 max-w-[28.125rem] w-full fixed">
                    <div className="flex flex-col gap-4 animate-enter opacity-0">
                        <span className="flex flex-col gap-2">
                            <h1 className="text-black text-[40px] font-semibold leading-12">Sauvegardez votre espace de coaching</h1>
                            <p className="text-grey text-base">
                                Vous y êtes presque. Créez votre compte pour utiliser Ref.
                            </p>
                        </span>
                    </div>

                    <div className="animate-enter opacity-0">
                        <SignUpForm />
                    </div>

                    <div className="animate-enter opacity-0">
                        <NavbarDivider />
                    </div>
                </div>
            </div>

            <div className="px-20 pt-20 flex flex-col gap-4 justify-center items-center w-1/2  bg-background-lighter">
                <div className="bg-white relative rounded-3xl flex flex-col p-10 gap-10 w-full max-w-[45rem] shadow-authContainer">
                    <div className="flex flex-col gap-6">
                        <h2 className="flex flex-col text-black text-2xl font-bold">
                            Optimisez la charge
                            d&apos;entraînement de vos coureurs
                        </h2>
                        <AuthList />
                    </div>
                </div>
                <TestimonyCard />
            </div>
        </>

    );
}

export default Register;