import Image from "next/image";

function IconBtn({
    src,
    alt,
    className = ''
}: {
    src: string;
    alt: string;
    className?: string;
}) {
    return (
        <button className={`w-fit p-2 cursor-pointer ${className}`}>
            <Image src={src} alt={alt} width={18} height={18} />
        </button>
    );
}

export default IconBtn;