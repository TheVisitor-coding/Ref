'use client';

import { usePathname } from "next/navigation";
import Sidebar from "../Sidebar";
import { Toaster } from "@/components/ui/sonner";

function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    const pagesWithoutSidebar = ['/auth/login', '/auth/sign-up', '/auth/onboarding'];

    const shouldShowSidebar = !pagesWithoutSidebar.some(page => pathname.startsWith(page));

    if (!shouldShowSidebar) {
        return (
            <>
                {children}
                <Toaster />
            </>
        );
    }

    return (
        <div className="flex p-6 min-h-screen">
            <Sidebar />
            <main className="pl-6 w-full flex-1">
                {children}
            </main>
            <Toaster />
        </div>
    );
}

export default AppLayout;