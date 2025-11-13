import Image from "next/image";

function PrimaryButton({
    label,
    icon,
    alt,
    onClick,
    disabled,
}: {
    label: string | React.ReactNode,
    icon?: string,
    alt?: string,
    onClick?: () => void,
    disabled?: boolean,
}) {
    return (
        <button
            onClick={onClick}
            className=" cursor-pointer justify-center px-3 py-1 bg-primary-blue text-white rounded-lg flex items-center gap-2"
            disabled={disabled}
        >
            {icon && <Image width={16} height={16} src={icon} alt={alt || 'Button Icon'} />}
            {label}
        </button>
    );
}

export default PrimaryButton;