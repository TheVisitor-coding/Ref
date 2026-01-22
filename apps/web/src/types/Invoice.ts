export type InvoiceLine = {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
}

export type AthleteInvoice = {
    id: number;
    documentId?: string;
    athlete_subscription?: {
        id: number;
    };
    athlete?: {
        id: number;
        username?: string;
        email?: string;
        first_name?: string;
        last_name?: string;
    };
    coach?: {
        id: number;
        username?: string;
        email?: string;
        first_name?: string;
        last_name?: string;
    };
    invoice_type?: 'invoice' | 'estimate' | 'credit_note';
    invoice_number: string;
    amount_ht: number;
    amount_ttc: number;
    currency?: string;
    statusInvoice?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
    due_date: string;
    issued_date?: string;
    paid_date?: string;
    description?: string;
    tax_rate?: number;
    tax_amount?: number;
    lines: InvoiceLine[];
    client_name?: string;
    client_address?: string;
    client_city?: string;
    client_email?: string;
    coach_name?: string;
    coach_address?: string;
    coach_city?: string;
    coach_email?: string;
    payment_instructions?: string;
    metadata?: Record<string, unknown>;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
}
