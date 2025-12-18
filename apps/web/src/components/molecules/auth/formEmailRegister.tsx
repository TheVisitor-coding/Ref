import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import { useLogin } from "@/hooks/useAuth";

function FormEmailRegister() {
    const { login } = useLogin()

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // register({
        //     email: "contact@email.fr",
        //     username: "contact",
        //     password: "#SuperPassword123"
        // })
        login({
            identifier: "contact",
            password: "#SuperPassword123"
        })
    }
    return (
        <form className="flex flex-col gap-4">
            <input type="email" placeholder="contact@email.fr" className="px-4 h-12 rounded-lg border-[#D3D3D3] border-[1px] text-base text-[#A0A0A0] placeholder:text-base" />
            <input type="password" placeholder="Mot de passe" className="px-4 h-12 rounded-lg border-[#D3D3D3] border-[1px] text-base text-[#A0A0A0] placeholder:text-base" />
            <PrimaryButton
                onClick={() => handleRegister}
                className="px-6 py-3 bg-primary-blue rounded-xl shadow-button text-white-100 text-[1.125rem]"
                label="Créer mon compte"
            />
            <p className="text-grey text-sm">En continuant, vous acceptez les <a className=" underline" href="#">conditions générales d’utilisations</a></p>
        </form>
    );
}

export default FormEmailRegister;