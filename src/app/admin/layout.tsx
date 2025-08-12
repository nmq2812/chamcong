"use client";
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

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
                <main className="w-full p-2 m-2">{children}</main>
                <Toaster />
            </SidebarProvider>
        </QueryClientProvider>
    );
}
