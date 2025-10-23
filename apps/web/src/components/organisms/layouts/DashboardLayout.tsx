import { JSX } from "react";

function DashboardLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="w-full h-fit min-h-screen flex flex-col gap-6 p-6 rounded-2xl bg-white border-[1px] border-grey-button overflow-x-hidden">
            {children}
        </div>
    );
}

export default DashboardLayout;