'use client';

import NavLinkButton from '@/components/atoms/buttons/NavLinkBtn';
import { NavbarGroup } from '@/data/navbarGroups';

interface SidebarGroupProps {
    group: NavbarGroup;
    isOpen: boolean;
}

function SidebarGroup({ group, isOpen }: SidebarGroupProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {group.heading && isOpen && (
                <div className="px-3 py-0">
                    <p className="text-secondary text-[10px] leading-[1.25]">{group.heading}</p>
                </div>
            )}
            {group.links.map((link) => (
                <NavLinkButton
                    key={link.href}
                    isOpen={isOpen}
                    href={link.href}
                    src={link.icon}
                    alt={`${link.title} Icon`}
                    hasSubLinks={link.hasSubLinks}
                    badge={link.badge}
                >
                    {link.title}
                </NavLinkButton>
            ))}
        </div>
    );
}

export default SidebarGroup;
