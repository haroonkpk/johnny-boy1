"use client";

import React from "react";
import Button from "../ui/Button";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (id: any) => void;
  className?: string;
}

export const TabNavigation = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}: TabNavigationProps) => {
  return (
    <div className={cn(
      "flex flex-wrap p-[clamp(0.3rem,0.6vw,0.6rem)] bg-white/60 gap-[clamp(0.9rem,1.2vw,1.4rem)]",
      className
    )}>
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "secondary" : "secondary-outline"}
          onClick={() => onTabChange(tab.id)}
         
        >
          {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
          <span className="font-black uppercase tracking-[0.05em] truncate">{tab.label}</span>
        </Button>
      ))}
    </div>
  );
};
