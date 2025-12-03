import { User, Calendar, Tag, Dumbbell } from 'lucide-react';
import Chip from '../chip/Chip';

interface ProgramFieldProps {
    icon: 'user' | 'sport' | 'calendar' | 'tag';
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

const iconMap = {
    user: User,
    sport: Dumbbell,
    calendar: Calendar,
    tag: Tag
};

export default function ProgramField({ icon, value, placeholder, disabled, onChange }: ProgramFieldProps) {
    const Icon = iconMap[icon];

    return (
        <div className="flex gap-2 items-center">
            <Icon className="size-4 text-secondary" />

            <div className="flex items-center rounded-lg hover:bg-[#F5F5F5] transition-colors">
                {onChange ? (
                    <Chip>
                        {value || placeholder}
                    </Chip>
                ) : (
                    <Chip>
                        {value || placeholder}
                    </Chip>
                )}
            </div>
        </div>
    );
}
