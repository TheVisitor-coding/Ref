'use client';

import ToggleSidebarBtn from '@/components/atoms/buttons/toggleBtn';
import NavbarDivider from '@/components/atoms/divider/NavbarDivider';
import SidebarGroup from '@/components/molecules/navigation/SidebarGroup';
import AthletesQuickAccess from '@/components/molecules/navigation/AthletesQuickAccess';
import { navbarGroups } from '@/data/navbarGroups';

function Navbar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
    return (
        <nav className="flex flex-col gap-4">
            <ToggleSidebarBtn isOpen={isOpen} setIsOpen={setIsOpen} />

            {navbarGroups.map((group, index) => (
                <div key={group.id} className="flex flex-col gap-4">
                    <SidebarGroup group={group} isOpen={isOpen} />

                    {group.id === 'athletes' && (
                        <AthletesQuickAccess isOpen={isOpen} />
                    )}

                    {index < navbarGroups.length - 1 && <NavbarDivider />}
                </div>
            ))}
        </nav>
    );
}

export default Navbar;