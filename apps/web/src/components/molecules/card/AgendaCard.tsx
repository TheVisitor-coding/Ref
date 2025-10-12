import Button from "@/components/atoms/buttons/Button";
import Card from "./Card";
import AgendaEventCard from "./AgendaEventCard";

function AgendaCard() {
    const participants: { name: string; image: string }[] = [
        { name: 'Paul', image: '/users/profil-pic.png' },
        { name: 'Antoine', image: '/users/profil-pic.png' }
    ]

    return (
        <Card className="py-6 pl-6 gap-6 flex flex-col bg-white col-span-7 border-[1px] border-grey-button">
            <div className="w-full flex items-center justify-between pr-6">
                <h2 className="text-primary text-lg font-semibold">Aujourd'hui</h2>
                <Button onClick={() => { }} label="Ouvrir l'agenda" />
            </div>

            <div className="w-full flex gap-4 overflow-x-auto">
                <AgendaEventCard
                    title="heading"
                    location="12 rue des Lauriers, 44100 Nantes"
                    startTime="8h00"
                    endTime="10h00"
                    participants={participants}
                />
            </div>
        </Card>
    );
}

export default AgendaCard;