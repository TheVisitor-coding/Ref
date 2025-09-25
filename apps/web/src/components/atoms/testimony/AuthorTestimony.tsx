function AuthorTestimony() {
    return (
        <div className="flex gap-4 items-center">
            <img src={'/users/profil-pic.png'} alt="User Profile Picture" className="object-cover" />
            <span className="flex flex-col text-base text-black">
                <p className="font-semibold">Emmanuel Granat</p>
                <p className="text-grey">Préparateur physique - Team UAE</p>
            </span>
        </div>
    );
}

export default AuthorTestimony;