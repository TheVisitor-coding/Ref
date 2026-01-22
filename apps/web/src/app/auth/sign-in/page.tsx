import Login from "@/components/organisms/auth/Login";
import Image from "next/image";

function SignIn() {
    return (
        <main className="w-full h-screen p-20 flex bg-white">
            <Image
                src="/ref_logo.svg"
                alt="Ref Logo"
                width={133}
                height={39}
                className="absolute top-8 left-8"
                priority
            />
            <Login />
        </main>
    )
}

export default SignIn;