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
        <div className="flex gap-6 pb-6 px-3 h-dvh">
            <Sidebar />
            <main className="pt-6 pr-3 w-full h-full overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

export default AppLayout;