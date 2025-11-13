'use client';

import NavigationButton from '@/components/atoms/buttons/NavigationButton';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface ChartFiltersProps {
    periodFilter?: string;
    periodOptions: { value: string; label: string }[];
    onPeriodChange?: (value: string) => void;

    secondaryFilter?: string;
    secondaryOptions: { value: string; label: string }[];
    secondaryLabel?: string;
    onSecondaryChange?: (value: string) => void;

    periodDisplay: string;
    onNavigatePrev: () => void;
    onNavigateNext: () => void;
}

function ChartFilters({
    periodFilter,
    periodOptions,
    onPeriodChange,
    secondaryFilter,
    secondaryOptions,
    secondaryLabel = 'Filtre',
    onSecondaryChange,
    periodDisplay,
    onNavigatePrev,
    onNavigateNext,
}: ChartFiltersProps) {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
                {onPeriodChange && (
                    <Select value={periodFilter} onValueChange={onPeriodChange}>
                        <SelectTrigger className="w-[140px] border-grey-button border-b-2">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {periodOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                {onSecondaryChange && (
                    <Select value={secondaryFilter} onValueChange={onSecondaryChange}>
                        <SelectTrigger className="w-[130px] border-grey-button border-b-2">
                            <SelectValue placeholder={secondaryLabel} />
                        </SelectTrigger>
                        <SelectContent>
                            {secondaryOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>

            <div className="flex items-center gap-2.5">
                <NavigationButton
                    direction="left"
                    onClick={onNavigatePrev}
                />
                <div className="
                    flex items-center justify-center gap-2
                    px-3 py-2 rounded-lg
                    border border-grey-button border-b-2
                    text-sm text-primary font-normal
                    bg-white min-w-[140px]
                ">
                    <span>{periodDisplay}</span>
                </div>
                <NavigationButton
                    direction="right"
                    onClick={onNavigateNext}
                />
            </div>
        </div>
    );
}

export default ChartFilters;
