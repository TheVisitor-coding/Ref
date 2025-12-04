import { forwardRef, InputHTMLAttributes } from 'react';
import { User, Calendar, Tag, Dumbbell } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getSportOptions, sportConfig, SportType } from '@/data/sports/sportsList';

type BaseProps = {
    icon: 'user' | 'run' | 'calendar' | 'tag';
};

type InputFieldProps = BaseProps &
    InputHTMLAttributes<HTMLInputElement> & {
        type?: 'text' | 'date';
    };

type SelectOption = { value: string; label: string };

type SelectFieldProps = BaseProps & {
    type: 'select';
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    placeholder?: string;
    options?: SelectOption[];
    selectVariant?: 'sport' | 'default';
};

type ProgramFieldProps = InputFieldProps | SelectFieldProps;

const iconMap = {
    user: User,
    run: Dumbbell,
    calendar: Calendar,
    tag: Tag
};

const sportOptions = getSportOptions();

const ProgramField = forwardRef<HTMLInputElement, ProgramFieldProps>(
    (props, ref) => {
        const { icon, type = 'text' } = props;
        const Icon = iconMap[icon];

        if (type === 'select') {
            const { value, onChange, disabled, placeholder, options, selectVariant = 'default' } = props as SelectFieldProps;

            const isSport = selectVariant === 'sport';
            const selectOptions = options || (isSport ? sportOptions : []);
            const effectiveValue = isSport && !value ? 'running' : value;

            const triggerClass = isSport
                ? `${sportConfig[effectiveValue as SportType]?.bgColor || 'bg-[#F5F5F5]'} ${sportConfig[effectiveValue as SportType]?.textColor || 'text-primary'}`
                : 'bg-[#F5F5F5] text-primary';

            return (
                <div className="flex gap-2 items-center select--noarrow">
                    <Icon className="size-4 text-secondary flex-shrink-0" />
                    <Select
                        value={effectiveValue}
                        onValueChange={onChange}
                        disabled={disabled}
                    >
                        <SelectTrigger
                            className={`h-fit px-2 py-1 rounded-md cursor-pointer border-none shadow-none focus:ring-0 ${triggerClass}`}
                        >
                            <SelectValue className='text-base' />
                        </SelectTrigger>
                        <SelectContent className='bg-white'>
                            {selectOptions.map((option) => {
                                const itemClass = isSport
                                    ? `${sportConfig[option.value as SportType]?.textColor || ''} focus:${sportConfig[option.value as SportType]?.bgColor || ''}`
                                    : '';
                                return (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                        className={itemClass}
                                    >
                                        {option.label}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>
            );
        }

        const { className, ...inputProps } = props as InputFieldProps;

        return (
            <div className="flex gap-2 items-center">
                <Icon className="size-4 text-secondary flex-shrink-0" />
                <input
                    ref={ref}
                    type={type}
                    {...inputProps}
                    className={`h-fit px-2 py-1 text-base text-primary placeholder:text-disabled bg-transparent hover:bg-[#EBEBEB] focus:bg-white focus:ring-1 focus:ring-primary-blue border-none outline-none rounded-lg transition-colors min-w-[120px] ${className || ''}`}
                />
            </div>
        );
    }
);

ProgramField.displayName = 'ProgramField';

export default ProgramField;
