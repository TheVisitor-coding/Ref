import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
    return (
        <div className={`rounded-2xl relative ${className}`}>
            {children}
        </div>
    );
};

export default Card;
