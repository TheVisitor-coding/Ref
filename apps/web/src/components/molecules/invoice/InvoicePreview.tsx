'use client';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { InvoiceLine } from './InvoiceLineItem';

interface InvoicePreviewProps {
    invoiceNumber: string;
    clientName: string;
    clientAddress: string;
    clientCity: string;
    clientEmail: string;
    issueDate: Date | undefined;
    dueDate: Date | undefined;
    lines: InvoiceLine[];
    coachName: string;
    coachAddress: string;
    coachCity: string;
    coachEmail: string;
    paymentInstructions: string;
    tvaRate: number;
}

export default function InvoicePreview({
    invoiceNumber,
    clientName,
    clientAddress,
    clientCity,
    clientEmail,
    issueDate,
    dueDate,
    lines,
    coachName,
    coachAddress,
    coachCity,
    coachEmail,
    paymentInstructions,
    tvaRate = 20,
}: InvoicePreviewProps) {
    const totalHT = lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
    const totalTVA = totalHT * (tvaRate / 100);
    const totalTTC = totalHT + totalTVA;

    const formatDate = (date: Date | undefined) => {
        if (!date) return '—';
        return format(date, 'd MMM yyyy', { locale: fr });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
        }).format(price);
    };

    return (
        <div className="flex flex-col gap-2 w-full bg-white rounded-xl overflow-hidden">
            {/* Header gris */}
            <div className="bg-grey-light flex flex-col gap-6 p-6 rounded-xl">
                <div className="flex items-start justify-between w-full">
                    <h2 className="text-2xl font-semibold text-primary font-poppins">Facture</h2>
                    <div className="flex flex-col gap-1 items-end text-right">
                        <p className="text-xs text-secondary leading-[1.25]">Facture n°</p>
                        <p className="text-sm font-semibold text-primary leading-[1.25]">{invoiceNumber}</p>
                    </div>
                </div>

                <div className="flex items-end justify-between w-full">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs text-secondary leading-[1.25] text-right">Facturé à :</p>
                        <div className="flex flex-col gap-2 text-primary">
                            <p className="text-sm font-semibold leading-[1.25]">{clientName || 'Nom du client'}</p>
                            <div className="text-xs leading-[1.25]">
                                <p>{clientAddress || 'Adresse'}</p>
                                <p>{clientCity || 'Ville, Pays'}</p>
                                <p>&nbsp;</p>
                                <p>{clientEmail || 'email@client.com'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 items-end">
                        <div className="flex flex-col gap-1 items-end text-right">
                            <p className="text-xs text-secondary leading-[1.25]">Fait le</p>
                            <p className="text-xs text-primary leading-[1.25]">{formatDate(issueDate)}</p>
                        </div>
                        <div className="flex flex-col gap-1 items-end text-right">
                            <p className="text-xs text-secondary leading-[1.25]">Paiement dû</p>
                            <p className="text-xs text-primary leading-[1.25]">{formatDate(dueDate)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content invoice */}
            <div className="flex flex-col gap-2 w-full">
                {/* Head table */}
                <div className="flex items-center justify-between px-6 pt-6 pb-0">
                    <p className="text-sm font-semibold text-primary leading-[1.25] w-[200px]">Description</p>
                    <div className="flex gap-3 items-center text-xxs text-secondary leading-[1.25] text-right">
                        <p className="w-[74.75px]">Quantité</p>
                        <p className="w-[74.75px]">Prix unitaire HT</p>
                        <p className="w-[74.75px]">TVA</p>
                        <p className="w-[74.75px]">Total HT</p>
                    </div>
                </div>

                {/* List items */}
                <div className="flex flex-col gap-3 px-6 pt-2 pb-0">
                    {lines.length === 0 ? (
                        <div className="flex items-center justify-between py-2">
                            <p className="text-xs text-secondary leading-[1.25]">Aucune ligne ajoutée</p>
                        </div>
                    ) : (
                        lines.map((line, index) => (
                            <div key={line.id} className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-primary leading-[1.25] w-[200px]">
                                        {line.description || `Élément ${index + 1}`}
                                    </p>
                                    <div className="flex gap-3 items-center text-xs leading-[1.25] text-right">
                                        <p className="text-secondary w-[74.75px]">{line.quantity}</p>
                                        <p className="text-secondary w-[74.75px]">{formatPrice(line.unitPrice)}</p>
                                        <p className="text-secondary w-[74.75px]">
                                            {formatPrice(line.quantity * line.unitPrice * (tvaRate / 100))}
                                        </p>
                                        <p className="text-primary w-[74.75px]">
                                            {formatPrice(line.quantity * line.unitPrice)}
                                        </p>
                                    </div>
                                </div>
                                {index < lines.length - 1 && (
                                    <div className="h-[1px] bg-grey-button w-full" />
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Total */}
            <div className="flex flex-col gap-0 items-end px-6 py-3">
                <div className="flex flex-col gap-2 items-end w-[121px]">
                    <div className="flex gap-4 items-start justify-end leading-[1.25] text-primary w-full">
                        <p className="text-xxs font-bold flex-1 text-left">Total HT</p>
                        <p className="text-xxs font-normal">{formatPrice(totalHT)}</p>
                    </div>
                    <div className="flex gap-4 items-start justify-end leading-[1.25] text-primary w-full">
                        <p className="text-xxs font-bold flex-1 text-left">TVA</p>
                        <p className="text-xxs font-normal">{formatPrice(totalTVA)}</p>
                    </div>
                    <div className="h-[1px] bg-grey-button w-full" />
                    <div className="flex gap-4 items-start justify-end leading-[1.25] text-primary w-full font-bold text-xxs">
                        <p className="flex-1 text-left">Total TTC</p>
                        <p>{formatPrice(totalTTC)}</p>
                    </div>
                </div>
            </div>

            {/* Entreprise coach */}
            <div className="flex gap-2 items-start px-6 py-0">
                <div className="flex-1 flex flex-col gap-2 leading-[1.25]">
                    <p className="text-base font-semibold text-primary">{coachName || 'Nom du coach'}</p>
                    <div className="text-xxs text-primary">
                        <p>{coachAddress || 'Adresse'}</p>
                        <p>{coachCity || 'Ville'}</p>
                        <p>France</p>
                    </div>
                    <p className="text-xxs text-brand">{coachEmail || 'email@company.com'}</p>
                </div>

                <div className="flex-1 flex flex-col gap-2">
                    <p className="text-xxs font-bold text-primary leading-[1.25]">Instruction de paiement</p>
                    <div className="text-xxs text-secondary leading-[1.25]">
                        <p>{paymentInstructions || 'Merci de régler cette facture par virement bancaire.'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
