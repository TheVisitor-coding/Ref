function FormEmailRegister() {
    return (
        <form className="flex flex-col gap-4">
            <input type="email" placeholder="contact@email.fr" className="px-4 h-12 rounded-lg border-[#D3D3D3] border-[1px] text-base text-[#A0A0A0] placeholder:text-base" />
            <button className="px-6 py-3 bg-primary-blue rounded-xl shadow-button text-white-100 text-[1.125rem]">Continuer</button>
            <p className="text-grey text-sm">En continuant, vous acceptez les <a href="#">conditions générales d’utilisations</a></p>
        </form>
    );
}

export default FormEmailRegister;