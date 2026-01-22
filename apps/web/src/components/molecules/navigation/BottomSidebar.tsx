'use client';

import NavLinkButton from '@/components/atoms/buttons/NavLinkBtn';
import { bottomNavLinks } from '@/data/navbarGroups';

function BottomSidebar({ isOpen }: { isOpen: boolean }) {
    return (
        <div className="mt-auto flex flex-col gap-2">
            {bottomNavLinks.map((link) => (
                <NavLinkButton
                    key={link.href}
                    isOpen={isOpen}
                    href={link.href}
                    src={link.icon}
                    alt={`${link.title} Icon`}
                >
                    {link.title}
                </NavLinkButton>
            ))}
        </div>
    );
}

export default BottomSidebar;