import { JSX } from "react";

function DashboardLayout({ children, withoutPadding }: { children: React.ReactNode, withoutPadding?: boolean }): JSX.Element {
    return (
        <div className={`w-full min-h-full flex flex-col gap-6 rounded-2xl bg-white border-[1px] border-grey-button overflow-x-hidden ${withoutPadding ? 'h-full' : 'p-6 h-auto'}`}>
            {children}
        </div>
    );
}

export default DashboardLayout;