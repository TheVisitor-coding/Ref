'use client';

import NavbarDivider from "@/components/atoms/divider/NavbarDivider";
import FormEmailRegister from "@/components/molecules/auth/formEmailRegister";
import AuthList from "@/components/molecules/list/AuthList";
import TestimonyCard from "@/components/molecules/testimony/testimonyCard";
import Image from "next/image";

function Register() {
    return (
        <>
            <div className="p-20 flex justify-center items-center w-1/2 h-screen">
                <div className="flex flex-col gap-10 max-w-[28.125rem] w-full fixed ">
                    <div className="flex flex-col gap-4">
                        <Image src={'/ref_logo.svg'} alt="Ref Logo" width={150} height={50} className="-translate-x-4" />
                        <span className="flex flex-col gap-2">
                            <h1 className="text-black text-5xl font-extrabold my-2">Bienvenue sur Ref.</h1>
                            <p className="text-grey text-[1.125rem]">
                                Renseignez votre adresse email pour profiter de
                                tous les avantages de l’application.
                            </p>
                        </span>
                    </div>

                    <FormEmailRegister />

                    <NavbarDivider />
                </div>
            </div>

            <div className="px-20 pt-20 flex flex-col gap-4 justify-center items-center w-1/2 h-full min-h-screen bg-background-lighter">
                <div className="bg-white relative rounded-3xl flex flex-col px-10 pb-10 mt-14 gap-10 w-full max-w-[45rem] shadow-authContainer">
                    <div>
                        <Image src={'/screenAuth.svg'} alt="Screen Webapp" width={281} height={257} className="absolute -top-20" />
                        <span className="absolute w-full h-64 top-2 left-0 bg-linear-to-b from-transparent to-white rounded-b-3xl -translate-y-20" />
                    </div>
                    <div className="flex flex-col gap-6 mt-42">
                        <h2 className="flex flex-col text-[#A0A5B1] text-[2rem] font-bold">
                            Simplifiez la gestion
                            <span className="text-black">Optimisez la performance</span>
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