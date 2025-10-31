import { Athlete } from "@/types/User";

type InvoicesSectionProps = {
    athlete: Athlete;
};

const InvoicesSection = ({ athlete }: InvoicesSectionProps) => {
    return (
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Factures</h2>
            <p className="mt-2 text-sm text-muted-foreground">
                Le suivi des factures et abonnements liés à {athlete.first_name ?? athlete.username} sera disponible dans cette
                section. Elle accueillera ultérieurement les données issues de Strapi ainsi que les actions de gestion.
            </p>
        </section>
    );
};

export default InvoicesSection;
