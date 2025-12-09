'use client'

import NavlinkButton from "@/components/atoms/buttons/NavLinkBtn";
import NavbarDivider from "@/components/atoms/divider/NavbarDivider";
import { navbarItems } from "@/data/navbarItem";
import ToggleSidebarBtn from "@/components/atoms/buttons/toggleBtn";

function Navbar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
    return (
        <nav className="flex flex-col gap-4">
            <ToggleSidebarBtn isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="w-full flex flex-col gap-2">
                <NavlinkButton isOpen={isOpen} href={""} src='/icons/Search.svg' alt="Search Icon">
                    Recherche
                </NavlinkButton>
                <NavlinkButton isOpen={isOpen} href={""} src='/icons/Notification.svg' alt="Notification Icon">
                    Notifications
                </NavlinkButton>
                <NavlinkButton isOpen={isOpen} href={"/"} src='/icons/Home.svg' alt="Home Icon">
                    Accueil
                </NavlinkButton>
            </div>

            <NavbarDivider />

            {navbarItems.map((item) => (
                <NavlinkButton isOpen={isOpen} href={item.href} src={item.icon} alt={`${item.title} Icon`} key={item.title}>
                    {item.title}
                </NavlinkButton>
            ))}

            <NavbarDivider />

        </nav>
    );
}

export default Navbar;