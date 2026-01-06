interface TextInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
}

export default function TextInput({
    label,
    value,
    onChange,
    placeholder = '',
    required = false,
    className = '',
}: TextInputProps) {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label className="text-base text-primary font-normal leading-[1.25]">
                {label}
                {required && <span className="text-accent ml-0.5">*</span>}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="bg-white border border-grey-button rounded-lg h-12 px-4 py-3 text-sm text-primary placeholder:text-placeholder leading-[1.25]"
            />
        </div>
    );
}
