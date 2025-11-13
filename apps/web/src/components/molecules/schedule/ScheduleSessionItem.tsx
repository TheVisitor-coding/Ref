import Chip from "@/components/atoms/chip/Chip";

export type ScheduleSessionTag = {
    label: string;
    icon: string;
    iconAlt?: string;
};

type ScheduleSessionItemProps = {
    title: string;
    tags: ScheduleSessionTag[];
};

const ScheduleSessionItem = ({ title, tags }: ScheduleSessionItemProps) => {
    return (
        <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold">{title}</h4>
            <div className="flex gap-3">
                {tags.map(({ label, icon, iconAlt }) => (
                    <Chip key={`${title}-${label}`} className="rounded-sm bg-primary-blue-light" icon={icon} iconAlt={iconAlt}>
                        <span className="text-[10px]">{label}</span>
                    </Chip>
                ))}
            </div>
        </div>
    );
};

export default ScheduleSessionItem;
