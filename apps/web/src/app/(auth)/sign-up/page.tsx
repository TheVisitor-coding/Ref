'use client'

import useRegister from "@/hooks/Auth";
import authStore from "@/store/AuthStore";

export default function SignUp() {

    const { register, error, loading } = useRegister()

    console.log(authStore().isAuthenticated)

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <h1>S'inscrire</h1>
            <button onClick={() => register({ username: "testuser", email: "test@example.com", password: "password" })}>
                S'inscrire
            </button>
        </div>
    );
}
