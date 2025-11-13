import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type InfoRowItem = {
    label: string;
    value: ReactNode;
};

type InfoRowProps = {
    items: InfoRowItem[];
    className?: string;
};

const InfoRow = ({ items, className }: InfoRowProps) => {
    return (
        <div className={cn("flex items-center gap-6", className)}>
            {items.map(({ label, value }) => (
                <div key={label} className="flex flex-1 flex-col gap-1 text-sm text-primary">
                    <span>{label}</span>
                    <span className="font-semibold">{value}</span>
                </div>
            ))}
        </div>
    );
};

export type { InfoRowItem };
export default InfoRow;
