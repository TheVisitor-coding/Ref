'use client'

import Register from "@/components/organisms/auth/Register"
import Image from "next/image"

export default function SignUp() {

    return (
        <main className="w-full h-auto mx-auto flex bg-white">
            <Image
                src="/ref_logo.svg"
                alt="Ref Logo"
                width={133}
                height={39}
                className="absolute top-8 left-8"
                priority
            />
            <Register />
        </main>
    )
}
