interface SecondaryButtonProps {
    onClick?: () => void;
    label?: string | React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

function SecondaryButton({
    onClick,
    label,
    className,
    type = "button",
    disabled = false
}: SecondaryButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`cursor-pointer px-3 py-1 rounded-lg border-b-2 border-[1px] border-grey-button transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${className || ''}`}
        >
            {label || 'Fermer'}
        </button>
    );
}

export default SecondaryButton;