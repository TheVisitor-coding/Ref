import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
    return (
        <div className={`flex flex-col p-2 bg-white-100 rounded-2xl relative ${className}`}>
            {children}
        </div>
    );
};

export default Card;
