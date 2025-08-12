import React from "react";
import ProvidersLayout from "./providers";

export const metadata = {
    title: "Check-in Management",
    description: "Admin Dashboard for managing branches, roles, devices, and staff",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ProvidersLayout>{children}</ProvidersLayout>;
}
