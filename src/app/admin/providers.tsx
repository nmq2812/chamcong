"use client";
import { AdminSidebar } from "@/components/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "sonner";

export default function ProvidersLayout({
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
