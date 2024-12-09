import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";

import Image from "next/image";
import { navLinks } from "@/constants";

export function FloatingDockDemo() {

  const links = navLinks.map((link) => ({
    title: link.label,
    icon: (
        <Image 
            src={link.icon}
            alt="link-icon"
            width={24}
            height={24}
        />
    ),
    href: link.route
  }))
  return (
    <div className="flex items-center justify-center h-[35rem] w-full">
        
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
