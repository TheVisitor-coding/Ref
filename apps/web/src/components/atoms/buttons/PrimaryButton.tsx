import Image from "next/image";

function PrimaryButton({
    label,
    icon,
    alt,
    onClick,
    disabled,
    className
}: {
    label: string | React.ReactNode,
    icon?: string,
    alt?: string,
    onClick?: () => void,
    disabled?: boolean,
    className?: string
}) {
    return (
        <button
            onClick={onClick}
            className={` cursor-pointer justify-center px-3 py-1 bg-primary-blue text-white disabled:bg-disabled disabled:text-secondary disabled:cursor-not-allowed rounded-lg flex items-center gap-2 ${className}`}
            disabled={disabled}
        >
            {icon && <Image width={16} height={16} src={icon} alt={alt || 'Button Icon'} />}
            {label}
        </button>
    );
}

export default PrimaryButton;