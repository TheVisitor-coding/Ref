import Image from "next/image";

interface IconTextProps {
    icon: string;
    alt: string;
    text: string;
    className?: string;
}

function IconText({ icon, alt, text, className = '' }: IconTextProps) {
    return (
        <span className={`flex items-center gap-2 text-sm text-secondary ${className}`}>
            <Image src={icon} alt={alt} width={16} height={16} />
            <p>{text}</p>
        </span>
    );
}

export default IconText;
