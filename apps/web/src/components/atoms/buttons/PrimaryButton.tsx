import Image from "next/image";

function PrimaryButton({ label, icon, alt }: { label: string, icon?: string, alt?: string }) {
    return (
        <button className=" cursor-pointer w-fit px-3 py-1 bg-primary-blue text-white rounded-lg flex items-center gap-2">
            {icon && <Image width={16} height={16} src={icon} alt={alt || 'Button Icon'} />}
            {label}
        </button>
    );
}

export default PrimaryButton;