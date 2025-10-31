import { Athlete } from "@/types/User";

type CalendarSectionProps = {
    athlete: Athlete;
};

const CalendarSection = ({ athlete }: CalendarSectionProps) => {
    return (
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Calendrier</h2>
            <p className="mt-2 text-sm text-muted-foreground">
                La planification des séances pour {athlete.first_name ?? athlete.username} sera affichée ici. Cette section
                pourra intégrer un calendrier interactif, la coordination des disponibilités et la gestion des conflits.
            </p>
        </section>
    );
};

export default CalendarSection;
