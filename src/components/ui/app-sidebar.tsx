import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { House } from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user"; 

export function AppSidebar() {
  // mock user
  const user = {
    name: "Maria Silva",
    username: "maria.silva",
    avatar: "/avatars/maria.jpg",
    email: "maria.silva@example.com",
  };

  const data = {
    user,
    navMain: [
      {
        title: "Dashboard",
        url: "dashboard",
        icon: House,
      },
      {
        title: "Leads",
        url: "leads",
        icon: House,
      },
      {
        title: "Settings",
        url: "settings",
        icon: House,
      },
    ],
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-10 items-center justify-center rounded-lg">
                <img
                  src="/icon.png"
                  alt="Logo Truther"
                  className="w-full h-[80px] object-contain"
                />
              </div>
              <div className="grid flex-1 text-left text-lg leading-tight">
                <span className="truncate font-semibold">Truther</span>
                <span className="truncate text-xs">Admin</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="border-b-border border-b-1">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
