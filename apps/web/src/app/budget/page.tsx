import BudgetClient from "@/components/organisms/budget/BudgetClient";
import DashboardLayout from "@/components/organisms/layouts/DashboardLayout";

export default async function BudgetPage() {
    return (
        <DashboardLayout>
            <BudgetClient />
        </DashboardLayout>
    );
}