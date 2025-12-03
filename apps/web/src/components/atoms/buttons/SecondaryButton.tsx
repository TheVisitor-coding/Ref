function SecondaryButton({ onClick, label, className }: { onClick?: () => void, label?: string | React.ReactNode, className?: string }) {
    return (
        <button
            onClick={onClick}
            className={`cursor-pointer px-3 py-1 rounded-lg border-b-2 border-[1px] border-grey-button transition-all hover:-translate-y-0.5 ${className || ''}`}
        >
            {label || 'Fermer'}
        </button>
    );
}

export default SecondaryButton;