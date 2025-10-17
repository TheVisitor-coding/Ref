import AgendaCard from "@/components/molecules/card/dashboard/AgendaCard";
import BudgetCard from "@/components/molecules/card/dashboard/BudgetCard";
import UrgencyCard from "@/components/molecules/card/dashboard/UrgencyCard";
import ShortcutCard from "@/components/molecules/card/ShortcutCard";
import { JSX } from "react";

function MainDashboard(): JSX.Element {
    return (
        <>
            <div className="w-full flex gap-6 mb-6">
                <ShortcutCard title="Gérer mes suivis" description="Consultez le statut de vos sportifs" src="/icons/shortcutIconStatus.svg" />
                <ShortcutCard title="Programmer une séance" description="Créez rapidement une séance" src="/icons/shortcutCreateSession.svg" />
                <ShortcutCard title="Mon récapitulatif" description="Une vue claire de votre activité" src="/icons/shortcutAskAi.svg" />
            </div>

            <div className="w-full flex gap-6">
                <div className="flex-[2] flex flex-col gap-6">
                    <AgendaCard />
                    <BudgetCard />
                </div>

                <div className="flex-[1] flex flex-col gap-6">
                    <UrgencyCard />
                </div>
            </div>
        </>
    );
}

export default MainDashboard;