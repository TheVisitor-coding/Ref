'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface InvoiceSearchBarProps {
    onSearch?: (value: string) => void;
    placeholder?: string;
}

export default function InvoiceSearchBar({ onSearch, placeholder = 'Rechercher...' }: InvoiceSearchBarProps) {
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        onSearch?.(newValue);
    };

    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-grey-button rounded-lg w-[250px]">
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="flex-1 text-sm text-primary placeholder:text-disabled outline-none bg-transparent"
            />
            <Search className="size-6 text-secondary shrink-0" />
        </div>
    );
}
