import { notFound } from 'next/navigation';
import DashboardLayout from '@/components/organisms/layouts/DashboardLayout';
import CreateInvoiceClient from '@/components/organisms/budget/CreateInvoiceClient';
import { fetchInvoiceByDocumentId } from '@/services/invoiceService';

interface EditInvoicePageProps {
    params: Promise<{
        documentId: string;
    }>;
}

export default async function EditInvoicePage({ params }: EditInvoicePageProps) {
    const { documentId } = await params;
    const invoice = await fetchInvoiceByDocumentId(documentId);

    if (!invoice) {
        notFound();
    }

    if (invoice.statusInvoice && invoice.statusInvoice !== 'draft') {
        notFound();
    }

    return (
        <DashboardLayout>
            <CreateInvoiceClient mode="edit" initialInvoice={invoice} />
        </DashboardLayout>
    );
}
