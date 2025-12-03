import DashboardLayout from "@/components/organisms/layouts/DashboardLayout";
import SessionsClient from "@/components/organisms/sessions/SessionsClient";
import { notFound } from "next/navigation";

async function SessionsPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const idNum = Number(id);
    if (!Number.isFinite(idNum)) notFound()

    return (
        <DashboardLayout withoutPadding>
            <SessionsClient athleteId={idNum} />
        </DashboardLayout>
    )
}

export default SessionsPage;