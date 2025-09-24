'use client'

import { useLogin, useLogout, useRegister } from "@/hooks/useAuth";

export default function SignUp() {

    const { register } = useRegister();
    const { login } = useLogin();

    const logout = useLogout();

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <h1>S'inscrire</h1>
            <button onClick={() => register({ username: "tetuser", email: "matteorossiroy@gmail.com", password: "#Password4576" })}>
                S'inscrire
            </button>

            <button onClick={() => login({ identifier: "tetuser", password: "#Password4576" })}>
                Se connecter
            </button>

            <button onClick={() => logout()}>
                Déconnexion
            </button>
        </div>
    );
}
