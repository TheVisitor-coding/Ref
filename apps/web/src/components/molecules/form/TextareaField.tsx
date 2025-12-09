import { forwardRef, TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    error?: string;
    required?: boolean;
    className?: string;
};

const TextAreaField = forwardRef<HTMLTextAreaElement, Props>(
    ({ label, error, required, className = '', ...textareaProps }, ref) => (
        <div className={`w-full flex flex-col gap-2 ${className}`}>
            <label className="text-primary">
                {label}{required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
                ref={ref}
                {...textareaProps}
                className={`w-full h-32 rounded-md border ${error ? 'border-red-500' : 'border-border-input'} text-primary placeholder:text-disabled px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50`}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
)

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;