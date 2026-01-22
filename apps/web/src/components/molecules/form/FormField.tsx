import { forwardRef, InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    required?: boolean;
    className?: string;
};

const FormField = forwardRef<HTMLInputElement, Props>(
    ({ label, error, required, className = '', ...inputProps }, ref) => {
        return (
            <div className={`w-full flex flex-col gap-2 ${className}`}>
                <label className="text-primary">
                    {label}{required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                    ref={ref}
                    {...inputProps}
                    className={`w-full h-12 rounded-md border ${error ? 'border-red-500' : 'border-border-input'} text-primary placeholder:text-disabled px-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50`}
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
        );
    }
);

FormField.displayName = 'FormField';

export default FormField;
