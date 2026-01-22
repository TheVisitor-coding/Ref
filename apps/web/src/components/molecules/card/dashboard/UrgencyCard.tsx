import Card from "../Card";
import UrgencyEventCard from "../event/UrgencyEventCard";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";

function UrgencyCard() {
    return (
        <Card className="p-6 gap-6 flex flex-col bg-white border-[1px] border-grey-button w-full">
            <div className="w-full flex items-center justify-between">
                <h2 className="text-primary text-lg font-semibold">Urgences</h2>
                <SecondaryButton onClick={() => { }} label="Détails" />
            </div>

            <div className="w-full flex flex-col gap-6">
                <UrgencyEventCard />
                <UrgencyEventCard />
                <UrgencyEventCard />
            </div>

        </Card>

    );
}

export default UrgencyCard;