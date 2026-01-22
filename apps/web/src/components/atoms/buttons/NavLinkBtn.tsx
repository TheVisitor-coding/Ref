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
    hasSubLinks = false,
    badge
}: {
    children: React.ReactNode;
    isOpen: boolean;
    href?: string;
    src: string;
    alt: string;
    hasSubLinks?: boolean;
    badge?: string;
}) {
    const [isFocused, setIsFocused] = useState(false);
    const pathname = usePathname()

    if (pathname === href && !isFocused) {
        setIsFocused(true);
    } else if (pathname !== href && isFocused) {
        setIsFocused(false);
    }

    const content = (
        <>
            <div className="flex gap-3 items-center flex-1 min-w-0">
                <Image src={src} alt={alt} width={18} height={18} />
                <p className={`${isOpen ? 'block' : 'hidden'} ${isFocused ? 'text-primary font-medium' : 'text-secondary'} text-sm leading-4 group-hover:text-primary group-hover:font-medium`}>
                    {children}
                </p>
            </div>
            {badge && isOpen && (
                <div className="bg-background-grey-light flex items-center justify-center px-2 py-1 rounded shrink-0">
                    <p className="text-secondary text-sm leading-[1.25] whitespace-nowrap">{badge}</p>
                </div>
            )}
            {hasSubLinks && isOpen && (
                <Image src="/icons/chevron-right.svg" alt="chevron" width={18} height={18} className="shrink-0" />
            )}
        </>
    );

    const className = `group w-full px-3 py-2 flex items-center gap-3 rounded-lg hover:bg-background-grey-light transition-colors ${isFocused ? 'bg-background-grey-light' : ''}`;

    if (href) {
        return (
            <Link href={href} className={className}>
                {content}
            </Link>
        );
    }

    return (
        <div className={className}>
            {content}
        </div>
    );
}

export default NavLinkButton;