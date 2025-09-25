'use client'

import NavLinkButton from "@/components/atoms/buttons/NavLinkBtn";

function BottomSidebar({ isOpen }: { isOpen: boolean }) {
    return (
        <div className="mt-auto flex flex-col gap-2">
            <NavLinkButton isOpen={isOpen} href={"/account"} src='/icons/Account.svg' alt="Account Icon">
                Compte
            </NavLinkButton>

            <NavLinkButton isOpen={isOpen} href={"/settings"} src='/icons/Settings.svg' alt="Settings Icon">
                Paramètres
            </NavLinkButton>
        </div>
    );
}

export default BottomSidebar;