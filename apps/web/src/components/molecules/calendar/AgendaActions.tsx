'use client';

import NavigationButton from '@/components/atoms/buttons/NavigationButton';
import SecondaryButton from '@/components/atoms/buttons/SecondaryButton';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { CalendarView } from './FullCalendarWrapper';

interface AgendaActionsProps {
    currentView: CalendarView;
    onViewChange: (view: CalendarView) => void;
    onTodayClick: () => void;
    onNavigatePrev: () => void;
    onNavigateNext: () => void;
}

const VIEW_OPTIONS = [
    { value: 'timeGridDay', label: 'Jour' },
    { value: 'timeGridWeek', label: 'Semaine' },
    { value: 'dayGridMonth', label: 'Mois' },
] as const;

function AgendaActions({
    currentView,
    onViewChange,
    onTodayClick,
    onNavigatePrev,
    onNavigateNext,
}: AgendaActionsProps) {
    return (
        <div className="flex items-center gap-2">
            <Select
                value={currentView}
                onValueChange={(value) => onViewChange(value as CalendarView)}
            >
                <SelectTrigger className="w-[130px] border-grey-button border-b-2 bg-white">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {VIEW_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <SecondaryButton
                onClick={onTodayClick}
                label="Aujourd'hui"
            />

            <NavigationButton
                direction="left"
                onClick={onNavigatePrev}
            />
            <NavigationButton
                direction="right"
                onClick={onNavigateNext}
            />
        </div>
    );
}

export default AgendaActions;
