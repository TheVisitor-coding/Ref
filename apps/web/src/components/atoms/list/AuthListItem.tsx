import Image from "next/image";

function AuthListItem({ content }: { content: string }) {
    return (
        <div className="flex gap-3 items-center">
            <span className="bg-accent/10 rounded-lg">
                <Image src={'/icons/check--accent.svg'} alt="Check Icon" width={24} height={24} className="p-1 object-cover" />
            </span>
            <span className="text-grey text-[1.125rem]">{content}</span>
        </div>
    );
}

export default AuthListItem;