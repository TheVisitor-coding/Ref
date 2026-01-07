import z from "zod";
import { formatDateToISO } from "@/utils/date";

export const InvoiceLineSchema = z.object({
    id: z.string(),
    description: z.string().min(1, "La description est requise").max(500),
    quantity: z.number().min(1, "La quantité doit être au moins 1"),
    unitPrice: z.number().min(0, "Le prix unitaire doit être positif"),
});

export const InvoiceFormSchema = z.object({
    athleteId: z.number({
        message: "Vous devez sélectionner un athlète",
    }).min(1, "Vous devez sélectionner un athlète"),

    issueDate: z.coerce.date({
        message: "La date d'émission est requise",
    }),

    dueDate: z.coerce.date({
        message: "La date d'échéance est requise",
    }),

    lines: z.array(InvoiceLineSchema).min(1, "Au moins une ligne est requise"),

    description: z.string().max(2000).optional(),

    taxRate: z.number().min(0).max(1),

    paymentInstructions: z.string().max(2000).optional(),
});

export const InvoicePayloadSchema = z.object({
    athlete: z.number(),
    coach: z.number(),

    invoice_type: z.enum(['invoice', 'estimate', 'credit_note']).default('invoice'),

    invoice_number: z.string().min(1).max(50),

    amount_ht: z.number().min(0),

    amount_ttc: z.number().min(0),

    tax_rate: z.number().min(0).max(1),

    tax_amount: z.number().min(0),

    currency: z.string().length(3).default('EUR'),

    statusInvoice: z.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled']),

    due_date: z.string(),

    issued_date: z.string().optional(),

    lines: z.array(z.object({
        id: z.string(),
        description: z.string(),
        quantity: z.number(),
        unitPrice: z.number(),
    })),

    description: z.string().optional(),

    client_name: z.string().optional(),
    client_address: z.string().optional(),
    client_city: z.string().optional(),
    client_email: z.string().optional(),

    coach_name: z.string().optional(),
    coach_address: z.string().optional(),
    coach_city: z.string().optional(),
    coach_email: z.string().optional(),

    payment_instructions: z.string().optional(),

    metadata: z.record(z.string(), z.unknown()).optional(),
});

export type InvoiceFormData = z.infer<typeof InvoiceFormSchema>;
export type InvoicePayload = z.infer<typeof InvoicePayloadSchema>;

export function transformInvoiceFormToPayload(
    form: InvoiceFormData,
    invoiceNumber: string,
    athleteData: {
        name: string;
        address?: string;
        city?: string;
        email?: string;
    },
    coachData: {
        name: string;
        address?: string;
        city?: string;
        email?: string;
    },
    isDraft: boolean,
    coachId: number
): InvoicePayload {
    const totalHT = form.lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
    const taxAmount = totalHT * form.taxRate;
    const totalTTC = totalHT + taxAmount;

    return {
        athlete: form.athleteId,
        coach: coachId,
        invoice_type: 'invoice',
        invoice_number: invoiceNumber,
        amount_ht: totalHT,
        amount_ttc: totalTTC,
        tax_rate: form.taxRate,
        tax_amount: taxAmount,
        currency: 'EUR',
        statusInvoice: isDraft ? 'draft' : 'sent',
        due_date: formatDateToISO(form.dueDate),
        issued_date: formatDateToISO(form.issueDate),
        lines: form.lines,
        description: form.description,
        client_name: athleteData.name,
        client_address: athleteData.address,
        client_city: athleteData.city,
        client_email: athleteData.email,
        coach_name: coachData.name,
        coach_address: coachData.address,
        coach_city: coachData.city,
        coach_email: coachData.email,
        payment_instructions: form.paymentInstructions,
    };
}
