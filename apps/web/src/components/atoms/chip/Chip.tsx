import Image from 'next/image';
import { ReactNode } from 'react';

interface ChipProps {
    icon?: string;
    iconAlt?: string;
    children: ReactNode;
    className?: string;
}

const Chip = ({ icon, iconAlt = '', children, className = '' }: ChipProps) => {
    return (
        <span className={`flex items-center gap-2 px-2 py-1 ${className}`}>
            {icon && <Image src={icon} alt={iconAlt} width={12} height={12} />}
            {children}
        </span>
    );
};

export default Chip;
