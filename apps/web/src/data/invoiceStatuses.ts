export const INVOICE_STATUSES = {
    draft: {
        label: 'Brouillon',
        bgColor: 'bg-grey-light',
        textColor: 'text-secondary',
    },
    sent: {
        label: 'En attente',
        bgColor: 'bg-[#fef5e7]',
        textColor: 'text-[#f59e0b]',
    },
    paid: {
        label: 'Payé',
        bgColor: 'bg-[#e5fced]',
        textColor: 'text-[#16a34a]',
    },
    overdue: {
        label: 'Impayé',
        bgColor: 'bg-[#fce9e9]',
        textColor: 'text-[#dc2626]',
    },
    cancelled: {
        label: 'Annulé',
        bgColor: 'bg-grey-light',
        textColor: 'text-secondary',
    },
} as const;

export type InvoiceStatus = keyof typeof INVOICE_STATUSES;
