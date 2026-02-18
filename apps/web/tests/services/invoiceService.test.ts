import { fetchCoachInvoices, generateInvoiceNumber } from '@/services/invoiceService';
import { getTokenFromCookie } from '@/actions/auth-actions';
import { getMeId } from '@/services/userService';

jest.mock('@/actions/auth-actions', () => ({
    getTokenFromCookie: jest.fn(),
}));

jest.mock('@/services/userService', () => ({
    getMeId: jest.fn(),
}));

global.fetch = jest.fn();

describe('invoiceService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchCoachInvoices', () => {
        it('should fetch invoices successfully', async () => {
            (getTokenFromCookie as jest.Mock).mockResolvedValue('token');
            (getMeId as jest.Mock).mockResolvedValue(10);

            const mockInvoices = [{ id: 1, amount: 100 }];
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ data: mockInvoices }),
            });

            const result = await fetchCoachInvoices();
            expect(result).toEqual(mockInvoices);
        });
    });

    describe('generateInvoiceNumber', () => {
        it('should return default for first invoice', async () => {
            (getTokenFromCookie as jest.Mock).mockResolvedValue('token');

            // Mock empty list response
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ data: [] }),
            });

            const result = await generateInvoiceNumber();
            const year = new Date().getFullYear();
            const month = String(new Date().getMonth() + 1).padStart(2, '0');
            expect(result).toBe(`${year}${month}-001`);
        });

        it('should increment existing invoice number', async () => {
            (getTokenFromCookie as jest.Mock).mockResolvedValue('token');

            // Mock existing invoice response
            const year = new Date().getFullYear();
            const month = String(new Date().getMonth() + 1).padStart(2, '0');
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ data: [{ invoice_number: `${year}${month}-045` }] }),
            });

            const result = await generateInvoiceNumber();
            expect(result).toBe(`${year}${month}-046`);
        });
    });
});
