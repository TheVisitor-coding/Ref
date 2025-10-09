'use client'

import PreDashboardModal from "@/components/molecules/modal/preDashboardModal";
import { useGradientAnimation } from "@/hooks/animations/useGradientAnimation";

function PreDashboard({ onClose }: { onClose: () => void }) {
    const { backgroundRef, backgroundAccentRef } = useGradientAnimation();

    return (
        <div className="w-full h-full relative overflow-hidden">
            <div
                className="absolute right-0 w-full h-full -bottom-2/5"
            >
                <div
                    ref={backgroundAccentRef}
                    className="absolute top-1/6 w-full h-2/5 bg-accent rounded-[50%] opacity-75 blur-[250px]"
                />

                <div
                    ref={backgroundRef}
                    className="absolute top-5/12 w-full h-3/5 bg-primary-blue rounded-[50%] opacity-75 blur-[150px]"
                />
            </div>

            <div className="w-full h-full relative z-10 flex flex-col justify-between items-center px-10 pt-8">
                <div className="w-full flex justify-end">
                    <button
                        onClick={onClose}
                        className="cursor-pointer px-3 py-1 rounded-lg border-b-2 border-[1px] border-grey-button transition-all hover:-translate-y-0.5"
                    >
                        Fermer
                    </button>
                </div>

                <PreDashboardModal />

            </div>
        </div>
    );
}

export default PreDashboard;
