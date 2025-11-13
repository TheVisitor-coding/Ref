export type AthleteInvoice = {
    id: number;
    athlete_subscription?: {
        id: number;
    };
    invoice_type?: 'invoice' | 'estimate' | 'credit_note';
    invoice_number: string;
    amount: number;
    currency?: string;
    statusInvoice?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
    due_date: string;
    issued_date?: string;
    paid_date?: string;
    description?: string;
    tax_rate?: number;
    tax_amount?: number;
    metadata?: Record<string, any>;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
}