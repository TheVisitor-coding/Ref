import AgendaCard from "@/components/molecules/card/AgendaCard";
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

            <div className="w-full grid gap-6 grid-cols-12">
                <AgendaCard />
            </div>
        </>
    );
}

export default MainDashboard;