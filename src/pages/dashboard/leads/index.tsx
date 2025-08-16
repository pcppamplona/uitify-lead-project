import { SidebarLayout } from "@/components/layout/SidebarLayout";
import LeadsList from "./leadsList";

export default function Leads() {
  return (
    <SidebarLayout current="Leads" breadcrumb={[{ label: "Dashboard", href: "/leads" }]}>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <LeadsList />
        </div>
      </div>
    </SidebarLayout>
  );
}
