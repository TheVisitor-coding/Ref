import AuthorTestimony from "@/components/atoms/testimony/AuthorTestimony";

function TestimonyCard() {
    return (
        <div className="bg-white rounded-3xl flex flex-col p-10 gap-6 w-full shadow-authContainer">
            <p className="text-base text-black font-medium relative text-pretty
            before:content-['\201C'] before:text-5xl before:text-accent before:absolute before:-top-4 before:-left-6
            ">Depuis que j’utilise REF, je gagne 8h par semaine tout en offrant à mes clients un suivi plus pro et 100 % personnalisé.
                <span className="text-5xl text-accent italic align-text-top inline-block h-0 ">&rdquo;</span>
            </p>
            <AuthorTestimony />
        </div>
    );
}

export default TestimonyCard;