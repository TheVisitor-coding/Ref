'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function NavLinkButton({
    children,
    isOpen,
    href,
    src,
    alt,
    hasSubLinks = false
}: {
    children: React.ReactNode;
    isOpen: boolean;
    href: string;
    src: string;
    alt: string;
    hasSubLinks?: boolean;
}) {
    const [isFocused, setIsFocused] = useState(false);
    const pathname = usePathname()

    if (pathname === href && !isFocused) {
        setIsFocused(true);
    } else if (pathname !== href && isFocused) {
        setIsFocused(false);
    }


    return (
        <Link href={href} className={`group w-full px-3 py-2 flex ${hasSubLinks ? 'justify-between' : 'gap-3'} items-center rounded-lg hover:bg-background-grey-light transition-colors ${isFocused ? 'bg-background-grey-light' : ''}`}>
            <div className="flex gap-3 items-center">
                <Image src={src} alt={alt} width={18} height={18} />
                <p className={`${isOpen ? 'block' : 'hidden'} ${isFocused ? 'text-primary font-medium' : 'text-secondary'} text-sm leading-4 group-hover:text-primary group-hover:font-medium`}>
                    {children}
                </p>
            </div>
            {hasSubLinks && isOpen && (
                <Image src="/icons/chevron-right.svg" alt="chevron" width={18} height={18} />
            )}
        </Link>
    );
}

export default NavLinkButton;