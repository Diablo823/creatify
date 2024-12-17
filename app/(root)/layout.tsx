import Mobilenav from "@/components/shared/Mobilenav";
import Sidebar from "@/components/shared/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar />
      <Mobilenav />
      <div className="root-container">
        <div className="mx-auto px-5 md:px-8 w-full text-dark-400 p-16-regular max-w-7xl">{children}</div>
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
// px-6 md:px-8 lg:px-12 w-full mx-auto