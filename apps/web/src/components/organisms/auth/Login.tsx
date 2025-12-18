'use client';

import SignInForm from "@/components/molecules/auth/SignInForm";
import Link from "next/link";

function Login() {
    return (
        <>
            <div className="max-w-[450px] mx-auto my-auto flex flex-col gap-10 w-full">
                <div>
                    <h1 className="text-[40px] text-pretty text-primary font-semibold leading-tight">
                        Heureux de vous revoir, <span className="text-primary-blue font-extrabold italic">Coach.</span>
                    </h1>
                    <p className="text-secondary text-base mt-2">
                        Reprenez le suivi de vos sportifs là où vous l&apos;aviez laissé.
                    </p>
                </div>

                <SignInForm />

                <p className="text-secondary mx-auto">Pas encore de compte ? <Link href="/auth/sign-up" className="underline">Créer un compte</Link></p>
            </div>
        </>

    );
}

export default Login;


/**
 * TODO Auth :
 * - Internationalisation des messages d'erreur (ex: "Invalid email/username or password")
 * - Bouton retour sur steps onboarding
 * - Animation preview sur colonne de droite à améliorer
 * - Login mutualisé entre coach et athlète ?
 * - Saisie du Nom + Prénom sur step 1 ?
 * - Conserver sur Form création de compte la colonne preview sidebar ?
 */