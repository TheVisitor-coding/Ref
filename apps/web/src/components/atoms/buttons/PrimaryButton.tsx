import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";

function PrimaryButton({
    label,
    icon,
    alt,
    onClick,
    disabled,
    isLoading,
    className,
    type = "button"
}: {
    label: string | React.ReactNode,
    icon?: string,
    alt?: string,
    onClick?: () => void,
    disabled?: boolean,
    isLoading?: boolean,
    className?: string,
    type?: "button" | "submit" | "reset"
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={` cursor-pointer justify-center px-3 py-1 bg-primary-blue text-white disabled:bg-disabled disabled:text-secondary disabled:cursor-not-allowed rounded-lg flex items-center gap-2 ${className}`}
            disabled={disabled || isLoading}
        >
            {isLoading ? (
                <Spinner className="text-white w-4 h-4" />
            ) : (
                <>
                    {icon && <Image width={16} height={16} src={icon} alt={alt || 'Button Icon'} />}
                    {label}
                </>
            )}
        </button>
    );
}

export default PrimaryButton;