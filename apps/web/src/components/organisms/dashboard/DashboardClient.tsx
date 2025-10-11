'use client'

import { User } from "@/types/User";
import { useState, useTransition } from "react";
import PreDashboard from "./PreDashboard";
import { updateLastPreDashboardViewAction } from "@/actions/user-actions";

type UpdateLastPreDashboardViewResult = typeof updateLastPreDashboardViewAction;

function DashboardClient({
    initialShowPreDashboard,
    updateLastPreDashboardViewAction,
    userInfo
}: {
    initialShowPreDashboard: boolean;
    userInfo: User | null;
    updateLastPreDashboardViewAction: UpdateLastPreDashboardViewResult;
}) {
    const [showPreDashboard, setShowPreDashboard] = useState<boolean>(initialShowPreDashboard);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleDashboardClose = async () => {
        if (!userInfo) {
            setShowPreDashboard(false);
            return;
        }
        setErrorMessage(null);
        startTransition(async () => {
            const result = await updateLastPreDashboardViewAction(userInfo.id);

            if (!result.success) {
                setErrorMessage(result.errorMessage);
                return;
            }

            setShowPreDashboard(false);
        });
    };

    return (
        <div className="w-full h-full relative overflow-hidden">
            {showPreDashboard ? (
                <PreDashboard
                    onClose={handleDashboardClose}
                />
            ) : (
                // <MainDashboard />
                <></>
            )}
        </div>
    );
}

export default DashboardClient;