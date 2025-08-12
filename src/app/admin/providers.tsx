'use client';
import { AdminSidebar } from '@/components/admin-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import useLanguage from '@/hooks/use-language';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Toaster } from 'sonner';

export default function ProvidersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = new QueryClient();

    // subscribe to language state -> this is to ensure the component re-renders when the language changes
    const lang = useLanguage((state) => state.language); 
    
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