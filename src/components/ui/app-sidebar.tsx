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

import { Settings, House } from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { useThemeStore } from "@/store/theme";

export function AppSidebar() {
  const theme = useThemeStore((state) => state.theme);
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
        url: "leads",
        icon: House,
        items: [
          {
            title: "Leads",
            url: "leads",
            matchUrls: ["leads", "leadDetails", "leadEdit"],
          },
        ],
      },

      {
        title: "Settings",
        url: "settings",
        icon: Settings,
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
              <img
                src={theme === "dark" ? "/logoWhite.svg" : "/logo.svg"}
                alt="Logo Truther"
                className="w-full h-[50px] object-contain"
              />
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
