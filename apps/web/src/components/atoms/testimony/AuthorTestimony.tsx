import Image from "next/image";

function AuthorTestimony() {
    return (
        <div className="flex gap-4 items-center">
            <Image src={'/users/profil-pic.png'} alt="User Profile Picture" className="object-cover" width={48} height={48} />
            <span className="flex flex-col text-base text-black">
                <p className="font-semibold">Emmanuel Granat</p>
                <p className="text-grey">Préparateur physique - Team UAE</p>
            </span>
        </div>
    );
}

export default AuthorTestimony;