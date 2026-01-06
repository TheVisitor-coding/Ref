import DashboardLayout from '@/components/organisms/layouts/DashboardLayout';
import CreateInvoiceClient from '@/components/organisms/budget/CreateInvoiceClient';

export default async function CreateInvoicePage() {
    return (
        <DashboardLayout>
            <CreateInvoiceClient />
        </DashboardLayout>
    );
}
