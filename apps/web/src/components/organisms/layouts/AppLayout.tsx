'use client';

import { usePathname } from "next/navigation";
import Sidebar from "../Sidebar";

function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    const pagesWithoutSidebar = ['/auth/login', '/auth/sign-up'];

    const shouldShowSidebar = !pagesWithoutSidebar.some(page => pathname.startsWith(page));

    if (!shouldShowSidebar) {
        return <>{children}</>;
    }

    return (
        <div className="flex gap-3 pb-6 px-3 h-dvh min-h-fit">
            <Sidebar />
            <main className="pt-6 pr-3 w-full h-full">
                <div className="w-full h-full bg-white rounded-2xl shadow-container">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default AppLayout;