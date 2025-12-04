import { forwardRef, InputHTMLAttributes } from 'react';
import { User, Calendar, Tag, Dumbbell } from 'lucide-react';

type ProgramFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    icon: 'user' | 'sport' | 'calendar' | 'tag';
};

const iconMap = {
    user: User,
    sport: Dumbbell,
    calendar: Calendar,
    tag: Tag
};

const ProgramField = forwardRef<HTMLInputElement, ProgramFieldProps>(
    ({ icon, className, ...inputProps }, ref) => {
        const Icon = iconMap[icon];

        return (
            <div className="flex gap-2 items-center">
                <Icon className="size-4 text-secondary flex-shrink-0" />
                <input
                    ref={ref}
                    {...inputProps}
                    className={`h-fit px-3 py-1.5 text-base text-primary placeholder:text-disabled bg-[#F5F5F5] hover:bg-[#EBEBEB] focus:bg-white focus:ring-1 focus:ring-primary-blue border-none outline-none rounded-lg transition-colors min-w-[120px] ${className || ''}`}
                />
            </div>
        );
    }
);

ProgramField.displayName = 'ProgramField';

export default ProgramField;
