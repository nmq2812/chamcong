"use client";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// export const metadata = {
//     title: "Admin Dashboard",
//     description: "Admin panel for management",
// };

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <SidebarProvider>
                <AdminSidebar />
                <main className="w-full h-full flex justify-center items-start">
                    
                    {children}
                </main>
            </SidebarProvider>
        </QueryClientProvider>
        
    );
}
