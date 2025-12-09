'use client';

import BottomSidebar from "../molecules/navigation/BottomSidebar";
import Navbar from "../molecules/navigation/Navbar";
import { useSidebar } from "../providers/SidebarProviders";

function Sidebar() {
    const { isOpen, setIsOpen } = useSidebar()

    return (
        <header
            className={`sticky top-0 flex flex-col gap-4 h-[95vh] max-h-screen d-flex transition-[width] duration-300
             ${isOpen ? 'w-56' : 'w-11'}`}>
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

            <BottomSidebar isOpen={isOpen} />
        </header>
    );
}

export default Sidebar;