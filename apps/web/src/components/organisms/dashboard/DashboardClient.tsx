'use client'

import { User } from "@/types/User";
import { useState } from "react";
import PreDashboard from "./PreDashboard";
import { updateLastPreDashboardView } from "@/actions/user-actions";

function DashboardClient({
    initialShowPreDashboard,
    userInfo
}: {
    initialShowPreDashboard: boolean;
    userInfo: User | null;
}) {
    const [showPreDashboard, setShowPreDashboard] = useState<boolean>(initialShowPreDashboard);

    const handleDashboardClose = async () => {
        if (!userInfo) {
            setShowPreDashboard(false);
            return;
        }
        try {
            const result = await updateLastPreDashboardView(userInfo.id);
        } catch (error) {
            console.error("Failed to update last pre-dashboard view:", error);
        } finally {
            setShowPreDashboard(false);
        }
    };

    return (
        <div className="w-full h-full relative overflow-hidden">
            {showPreDashboard ? (
                <PreDashboard onClose={handleDashboardClose} />
            ) : (
                // <MainDashboard />
                <></>
            )}
        </div>
    );
}

export default DashboardClient;