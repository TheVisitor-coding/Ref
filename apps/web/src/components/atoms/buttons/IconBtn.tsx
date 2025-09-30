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
        <button className={`w-fit p-2 bg-primary-blue rounded-lg outline-4 outline-primary-blue/20 cursor-pointer ${className}`}>
            <img src={src} alt={alt} width={18} height={18} />
        </button>
    );
}

export default IconBtn;