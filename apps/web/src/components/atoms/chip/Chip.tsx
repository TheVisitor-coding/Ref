import { ReactNode } from 'react';

interface ChipProps {
    icon?: string;
    iconAlt?: string;
    children: ReactNode;
    className?: string;
}

const Chip = ({ icon, iconAlt = '', children, className = '' }: ChipProps) => {
    return (
        <span className={`flex items-center gap-2 px-2 py-1 bg-white-100 rounded-lg ${className}`}>
            {icon && <img src={icon} alt={iconAlt} />}
            {children}
        </span>
    );
};

export default Chip;
