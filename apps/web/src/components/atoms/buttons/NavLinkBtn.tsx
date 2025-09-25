'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function NavLinkButton({ children, isOpen, href, src, alt }: { children: React.ReactNode; isOpen: boolean; href: string; src: string; alt: string }) {
    const [isFocused, setIsFocused] = useState(false);
    const pathname = usePathname()

    if (pathname === href && !isFocused) {
        setIsFocused(true);
    } else if (pathname !== href && isFocused) {
        setIsFocused(false);
    }


    return (
        <Link href={href} className={`group w-full px-3 py-2 flex gap-3 items-center rounded-lg hover:bg-background-light transition-colors ${isFocused ? 'bg-background-light' : ''}`}>
            <Image src={src} alt={alt} width={18} height={18} />
            <p className={`${isOpen ? 'block' : 'hidden'} ${isFocused ? 'text-primary' : 'text-secondary'} text-sm leading-4 group-hover:text-primary group-hover:font-medium`}>
                {children}
            </p>
        </Link>
    );
}

export default NavLinkButton;