import Breadcrumbs from "@/components/atoms/breadcrumb/breadcrumbs";
import DashboardLayout from "@/components/organisms/layouts/DashboardLayout";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function Loading() {
  return (
    <DashboardLayout>
      <Breadcrumbs
        items={[
          {
            label: "Sportifs",
            href: "/athletes",
            icon: <Image src="/icons/Account.svg" alt="Account Icon" width={16} height={16} />,
          },
        ]}
      />

      <div className="flex justify-between items-center">
        <h1 className="text-[32px] text-primary font-semibold">Mes clients</h1>
        <Skeleton className="h-10 w-48" />
      </div>

      <Skeleton className="h-56 w-full mt-6" />

      <div className="mt-4 flex justify-end">
        <Skeleton className="h-8 w-48" />
      </div>
    </DashboardLayout>
  );
}
