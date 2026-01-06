import Breadcrumbs from "@/components/atoms/breadcrumb/breadcrumbs";
import BudgetClient from "@/components/organisms/budget/BudgetClient";
import DashboardLayout from "@/components/organisms/layouts/DashboardLayout";
import { QueryClient } from "@tanstack/react-query";
import Image from "next/image";

export default async function BudgetPage() {
    const qc = new QueryClient();


    return (
        <DashboardLayout>
            <BudgetClient />
        </DashboardLayout>
    );
}