import Card from "../Card";
import BudgetChart from "../../charts/BudgetChart";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";

function BudgetCard() {
    return (
        <Card className="p-6 gap-6 flex flex-col bg-white border-[1px] border-grey-button w-full">
            <div className="w-full flex items-center justify-between">
                <h2 className="text-primary text-lg font-semibold">Mon chiffres d'affaires</h2>
                <SecondaryButton onClick={() => { }} label="Détails" />
            </div>

            <BudgetChart />

            <div className="w-full flex flex-col gap-6 p-6 bg-background-light rounded-xl">
                <div className="w-full flex items-center justify-between">
                    <h4 className="text-primary font-medium">Revenu mensuel (Juin)</h4>
                    <div className="flex items-center gap-3">
                        <span className="text-grey ">3 700 €</span>
                        <span className="text-xs font-medium  text-[#0D622C] p-1 bg-[#E5FCED] rounded-sm">+ 700 €</span>
                    </div>
                </div>

                <div className="w-full flex items-center justify-between">
                    <h4 className="text-primary font-medium">Nombre de paiements</h4>
                    <div className="flex items-center gap-3">
                        <span className="text-grey ">28</span>
                        <span className="text-xs font-medium  text-[#0D622C] p-1 bg-[#E5FCED] rounded-sm">+ 5</span>
                    </div>
                </div>
            </div>
        </Card>

    );
}

export default BudgetCard;