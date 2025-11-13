import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import DataTable from "@/components/molecules/table/DataTable";
import { columns } from "@/components/molecules/table/invoices/Columns";
import { Athlete } from "@/types/User";

const InvoicesSection = ({ athlete }: { athlete: Athlete }) => {

    const fakeInvoices = [
        { id: 1, title: 'Facture Janvier 2024', billing_date: '2024-01-31', state: 'Payée', invoice_number: 'INV-2024-001', amount: 100, due_date: '2024-01-31' },
        { id: 2, title: 'Facture Février 2024', billing_date: '2024-02-28', state: 'En attente', invoice_number: 'INV-2024-002', amount: 200, due_date: '2024-02-28' },
        { id: 3, title: 'Facture Mars 2024', billing_date: '2024-03-31', state: 'Payée', invoice_number: 'INV-2024-003', amount: 150, due_date: '2024-03-31' },
    ]

    return (
        <section className="flex flex-col w-full gap-6">
            <div className="flex gap-4 justify-end">
                <PrimaryButton label="Importer une facture" onClick={() => {/* TODO */ }} />
            </div>

            <div className="flex flex-col w-full gap-6">
                <DataTable columns={columns} data={fakeInvoices} />
            </div>
        </section>
    );
};

export default InvoicesSection;
