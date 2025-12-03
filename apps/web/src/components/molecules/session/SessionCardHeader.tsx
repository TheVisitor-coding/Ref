import { sportConfig } from "@/data/sports/sportsList";
import Image from "next/image";

interface SessionCardHeaderProps {
    date: string;
    title: string;
    sportType: keyof typeof sportConfig;
    headerBg: string;
    headerText: string;
}

function SessionCardHeader({ date, title, sportType, headerBg, headerText }: SessionCardHeaderProps) {
    const sport = sportConfig[sportType];

    return (
        <div className={`flex gap-2 items-center justify-between px-6 py-4 rounded-xl ${headerBg}`}>
            <div className={`flex flex-col gap-1 flex-1 ${headerText}`}>
                <p className="text-xs font-normal leading-[1.25]">
                    {date}
                </p>
                <h2 className="text-2xl font-black italic leading-[1.25] uppercase font-poppins tracking-tight">
                    {title}
                </h2>
            </div>

            <div className={`flex items-center justify-center gap-2 px-2 py-1 rounded-sm ${sport.bgColor}`}>
                <div className="w-5 h-5 flex items-center justify-center">
                    <Image
                        src={sport.icon}
                        alt={sportType}
                        width={20}
                        height={20}
                        className="object-contain"
                    />
                </div>
                <span className={`text-sm font-normal leading-[1.25] ${sport.textColor}`}>
                    {sportType}
                </span>
            </div>
        </div>
    );
}

export default SessionCardHeader;
