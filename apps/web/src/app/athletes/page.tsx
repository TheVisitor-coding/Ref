import Breadcrumbs from "@/components/atoms/breadcrumb/breadcrumbs";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import { Athlete, columns } from "@/components/molecules/table/athletes/Columns";
import DataTable from "@/components/molecules/table/athletes/DataTable";
import DashboardLayout from "@/components/organisms/layouts/DashboardLayout";
import Image from "next/image";

export default async function AthletesPage() {
    const data: Athlete[] = [
        {
            avatar: '/users/profilePic.png',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1 234 567 890',
            tag: 'Premium',
        },
        {
            avatar: '/users/profilePic.png',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1 234 567 891',
            tag: 'Basic',
        },
        {
            avatar: '/users/profilePic.png',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1 234 567 891',
            tag: 'Basic',
        }, {
            avatar: '/users/profilePic.png',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1 234 567 891',
            tag: 'Basic',
        }, {
            avatar: '/users/profilePic.png',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1 234 567 891',
            tag: 'Basic',
        }, {
            avatar: '/users/profilePic.png',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1 234 567 891',
            tag: 'Basic',
        }, {
            avatar: '/users/profilePic.png',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1 234 567 891',
            tag: 'Basic',
        }, {
            avatar: '/users/profilePic.png',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1 234 567 891',
            tag: 'Basic',
        }, {
            avatar: '/users/profilePic.png',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1 234 567 891',
            tag: 'Basic',
        }, {
            avatar: '/users/profilePic.png',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1 234 567 891',
            tag: 'Basic',
        }, {
            avatar: '/users/profilePic.png',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1 234 567 891',
            tag: 'Basic',
        }, {
            avatar: '/users/profilePic.png',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1 234 567 891',
            tag: 'Basic',
        }, {
            avatar: '/users/profilePic.png',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1 234 567 891',
            tag: 'Basic',
        },
    ];

    return (
        <>
            <DashboardLayout>
                <Breadcrumbs
                    items={[
                        { label: "Sportifs", href: "/athletes", icon: <Image src="/icons/Account.svg" alt="Account Icon" width={16} height={16} /> },
                    ]}
                />

                <div className="flex justify-between items-center">
                    <h1 className="text-[32px] text-primary font-semibold">Mes clients</h1>
                    <PrimaryButton label="Inviter un sportif" icon="/icons/Sportifs/user-plus.svg" alt="Plus Icon" />
                </div>

                <DataTable columns={columns} data={data} />
            </DashboardLayout>
        </>
    );
}