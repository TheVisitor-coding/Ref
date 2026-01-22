import { INVOICE_STATUSES, InvoiceStatus } from '@/data/invoiceStatuses';

interface InvoiceStatusBadgeProps {
    status: InvoiceStatus;
}

export default function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
    const statusConfig = INVOICE_STATUSES[status] || INVOICE_STATUSES.draft;

    return (
        <span
            className={`inline-flex items-center justify-center px-2 py-1 rounded text-sm ${statusConfig.bgColor} ${statusConfig.textColor}`}
        >
            {statusConfig.label}
        </span>
    );
}
