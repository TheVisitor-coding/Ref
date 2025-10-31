import { LucideIcon } from "lucide-react";

type HighlightItemProps = {
    icon: LucideIcon;
    title: string;
    subtitle: string;
};

const HighlightItem = ({ icon: Icon, title, subtitle }: HighlightItemProps) => {
    return (
        <div className="flex items-center gap-3 text-primary">
            <span className="rounded-xl bg-primary-blue-light p-4">
                <Icon width={20} height={20} />
            </span>
            <span className="flex flex-col gap-1 text-sm">
                <p>{title}</p>
                <p className="font-semibold">{subtitle}</p>
            </span>
        </div>
    );
};

export default HighlightItem;
