import Image from "next/image";
import { JSX } from "react";

function LastOpenedPageCard({ iconSrc, label }: { iconSrc: string; label: string }): JSX.Element {
    return (
        <div className="p-6 min-w-44 w-44 flex flex-col gap-4 bg-white rounded-2xl border-[1px] border-grey-button cursor-pointer">
            <Image src={iconSrc} alt="last opened page icon" width={24} height={24} />
            <h3 className="text-primary text-lg font-semibold">{label}</h3>
        </div>
    );
}

export default LastOpenedPageCard;