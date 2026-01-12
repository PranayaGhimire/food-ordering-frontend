'use client'
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
} from "@/components/ui/sidebar";
import Link from "next/link";
import { CustomTrigger } from "./CustomTrigger";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
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
              {items.map((item) => { 
                const isActive = pathname === item.url
                return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={`${isActive && 'bg-cyan-500 text-white'} text-[16px] p-4 hover:bg-white hover:border-2 hover:border-cyan-500 hover:text-cyan-500 font-medium transition-all ease-in-out duration-400   `}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )})}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
