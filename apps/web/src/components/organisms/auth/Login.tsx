'use client';

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SignInForm from "@/components/molecules/auth/SignInForm";
import AnimatedRoleText from "@/components/atoms/text/AnimatedRoleText";
import Link from "next/link";

function Login() {
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
        <div ref={containerRef} className="max-w-[450px] mx-auto my-auto flex flex-col gap-10 w-full">
            <div className="animate-enter opacity-0">
                <h1 className="text-[40px] text-pretty text-primary font-semibold leading-tight">
                    Heureux de vous revoir, <AnimatedRoleText roles={['Coach.', 'Sportif.']} className="text-primary-blue font-extrabold italic" />
                </h1>
                <p className="text-secondary text-base mt-2">
                    Reprenez le suivi de vos sportifs là où vous l&apos;aviez laissé.
                </p>
            </div>

            <div className="animate-enter opacity-0">
                <SignInForm />
            </div>

            <p className="animate-enter opacity-0 text-secondary mx-auto">
                Pas encore de compte ? <Link href="/auth/sign-up" className="underline">Créer un compte</Link>
            </p>
        </div>
    );
}

export default Login;