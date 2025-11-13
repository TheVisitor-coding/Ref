import { ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    variant?: 'error' | 'success' | 'warning' | 'info';
    className?: string;
}

const Badge = ({ children, variant = 'info', className = '' }: BadgeProps) => {
    const variantClasses = {
        error: 'bg-error-50 text-error',
        success: 'bg-success-50 text-success',
        warning: 'bg-warning-50 text-warning',
        info: 'bg-primary-blue-light'
    };

    return (
        <span
            className={`px-2 py-1 w-fit rounded-lg ${variantClasses[variant]} ${className}`}
        >
            {children}
        </span>
    );
};

export default Badge;
