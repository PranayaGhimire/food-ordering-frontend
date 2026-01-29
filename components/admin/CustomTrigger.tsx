"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { ArrowLeft, ArrowRight, Menu } from "lucide-react";
import { Button } from "../ui/button";

export function CustomTrigger() {
  const { toggleSidebar, open, isMobile } = useSidebar();

  return (
    <Button
      variant={`primary`}
      onClick={toggleSidebar}
      className={`text-white w-8 rounded-full`}
    >
      {open && !isMobile ? <ArrowLeft /> : isMobile ? <Menu /> : <ArrowRight />}
    </Button>
  );
}
