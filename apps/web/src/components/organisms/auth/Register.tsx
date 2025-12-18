'use client';

import NavbarDivider from "@/components/atoms/divider/NavbarDivider";
import SignUpForm from "@/components/molecules/auth/SignUpForm";
import AuthList from "@/components/molecules/list/AuthList";
import TestimonyCard from "@/components/molecules/testimony/testimonyCard";
import Image from "next/image";

function Register() {
    return (
        <>
            <div className="p-20 flex justify-center items-center w-1/2 h-screen">
                <div className="flex flex-col gap-10 max-w-[28.125rem] w-full fixed">
                    <div className="flex flex-col gap-4">
                        <Image src={'/ref_logo.svg'} alt="Ref Logo" width={150} height={50} className="-translate-x-4" />
                        <span className="flex flex-col gap-2">
                            <h1 className="text-black text-[40px] font-semibold leading-12">Sauvegardez votre espace de coaching</h1>
                            <p className="text-grey text-base">
                                Vous y êtes presque. Créez votre compte pour utiliser Ref.
                            </p>
                        </span>
                    </div>

                    <SignUpForm />

                    <NavbarDivider />
                </div>
            </div>

            <div className="px-20 pt-20 flex flex-col gap-4 justify-center items-center w-1/2  bg-background-lighter">
                <div className="bg-white relative rounded-3xl flex flex-col p-10 gap-10 w-full max-w-[45rem] shadow-authContainer">
                    <div className="flex flex-col gap-6">
                        <h2 className="flex flex-col text-black text-2xl font-bold">
                            Optimisez la charge
                            d'entraînement de vos coureurs
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