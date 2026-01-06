'use client';

import TextInput from '@/components/atoms/inputs/TextInput';
import NumberInput from '@/components/atoms/inputs/NumberInput';

export interface InvoiceLine {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
}

interface InvoiceLineItemProps {
    line: InvoiceLine;
    onChange: (id: string, field: keyof InvoiceLine, value: string | number) => void;
    className?: string;
}

export default function InvoiceLineItem({ line, onChange, className = '' }: InvoiceLineItemProps) {
    return (
        <div className={`flex gap-6 items-end ${className}`}>
            <TextInput
                label="Élément 1"
                value={line.description}
                onChange={(value) => onChange(line.id, 'description', value)}
                placeholder="Saisissez le détail"
                required
                className="flex-1"
            />
            <NumberInput
                label="Quantité"
                value={line.quantity}
                onChange={(value) => onChange(line.id, 'quantity', value)}
                placeholder="0"
                required
                showIcon="chevrons"
                className="w-32"
            />
            <NumberInput
                label="Prix unitaire HT"
                value={line.unitPrice}
                onChange={(value) => onChange(line.id, 'unitPrice', value)}
                placeholder="0,00"
                required
                showIcon="euro"
                className="flex-1"
            />
        </div>
    );
}
