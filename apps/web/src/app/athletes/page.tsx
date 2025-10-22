import Breadcrumbs from "@/components/atoms/breadcrumb/breadcrumbs";
import DashboardLayout from "@/components/organisms/layouts/DashboardLayout";
import Image from "next/image";

export default async function AthletesPage() {
    return (
        <>
            <DashboardLayout>
                <Breadcrumbs
                    items={[
                        { label: "Sportifs", href: "/athletes", icon: <Image src="/icons/Account.svg" alt="Account Icon" width={16} height={16} /> },
                    ]}
                />
            </DashboardLayout>
        </>
    );
}