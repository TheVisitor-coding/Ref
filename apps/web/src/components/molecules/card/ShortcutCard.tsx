import Image from "next/image";

function ShortcutCard({ title, description, src }: { title: string; description: string, src: string }) {
    return (
        <div className="w-full max-w-[365px] h-fit flex items-center gap-6 p-6 bg-white rounded-2xl border-[1px] border-grey-button cursor-pointer">
            <Image src={src} alt="shortcut icon" width={48} height={48} />
            <div className="flex flex-col">
                <span className="text-base font-semibold text-primary">{title}</span>
                <span className="text-sm text-secondary">{description}</span>
            </div>

        </div>
    );
}

export default ShortcutCard;