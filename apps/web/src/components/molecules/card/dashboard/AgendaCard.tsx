import Card from "../Card";
import AgendaEventCard from "../event/AgendaEventCard";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";

function AgendaCard() {
    const participants: { name: string; image: string }[] = [
        { name: 'Paul', image: '/users/profil-pic.png' },
        { name: 'Antoine', image: '/users/profil-pic.png' }
    ]

    return (
        <Card className="py-6 pl-6 gap-6 flex flex-col bg-white border-[1px] border-grey-button w-full">
            <div className="w-full flex items-center justify-between pr-6">
                <h2 className="text-primary text-lg font-semibold">Aujourd'hui</h2>
                <SecondaryButton onClick={() => { }} label="Ouvrir l'agenda" />
            </div>

            <div className="w-full relative flex gap-4 overflow-x-auto">
                <AgendaEventCard
                    title="heading"
                    location="12 rue des Lauriers, 44100 Nantes"
                    startTime="8h00"
                    endTime="10h00"
                    participants={participants}
                />
                <AgendaEventCard
                    title="heading"
                    location="12 rue des Lauriers, 44100 Nantes"
                    startTime="8h00"
                    endTime="10h00"
                    participants={participants}
                />

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