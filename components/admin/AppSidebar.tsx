import {
  LayoutDashboard,
  Soup,
  User,
  UtensilsCrossed,
} from "lucide-react";

import Image from "next/image";
import momoHouse from "@/assets/MomoHouse.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { CustomTrigger } from "./CustomTrigger";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: User,
  },
  {
    title: "Foods",
    url: "/admin/foods",
    icon: Soup,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: UtensilsCrossed,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="shadow-md">
     
      <SidebarContent>
        
        <SidebarGroup>
          <div className="hidden md:block">
                <CustomTrigger/>
          </div>
         
          <div className="my-4 flex flex-col items-center">
                 <Image src={momoHouse} alt="Logo" className="w-20  rounded-full"/>
                   <SidebarGroupLabel className="text-[16px] text-center">
            The Momo House
          </SidebarGroupLabel>
          </div>
        
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
