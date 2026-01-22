import Image from "next/image";

function Avatar({ src, alt }: { src: string; alt: string }) {
    return (
        <Image
            src={src}
            alt={alt}
            width={24}
            height={24}
            className="outline-2 outline-white rounded-full object-cover"
        />
    );
}

export default Avatar;