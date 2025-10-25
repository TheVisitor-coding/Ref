function FormField({
    label,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    required = false,
}: {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
}) {
    return (
        <div className="w-full flex flex-col gap-2">
            <label className="text-primary">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full h-12 rounded-md border border-border-input text-primary placeholder:text-disabled px-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            />
        </div>
    );
}

export default FormField;