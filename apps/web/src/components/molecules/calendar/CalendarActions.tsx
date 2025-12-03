import NavigationButton from "@/components/atoms/buttons/NavigationButton";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";

interface CalendarActionsProps {
    onPeriodChange?: () => void;
    onTodayClick: () => void;
    onNavigatePrev: () => void;
    onNavigateNext: () => void;
}

function CalendarActions({
    onPeriodChange,
    onTodayClick,
    onNavigatePrev,
    onNavigateNext
}: CalendarActionsProps) {
    return (
        <div className="flex items-center gap-2 justify-end">
            <SecondaryButton onClick={onTodayClick} label="Aujourd'hui" />

            <NavigationButton direction="left" onClick={onNavigatePrev} />
            <NavigationButton direction="right" onClick={onNavigateNext} />
        </div>
    );
}

export default CalendarActions;
