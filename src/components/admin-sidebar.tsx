import {
    ContactRound,
    Home,
    MapPinned,
    ShieldUser,
    UserCheck,
    Camera,
    Settings
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: Home,
    },
    {
        title: "Nhân viên",
        url: "/admin/staff",
        icon: ContactRound,
    },
    {
        title: "Thiết bị",
        url: "/admin/device",
        icon: Camera,
    },
    {
        title: "Chi nhánh",
        url: "/admin/branch",
        icon: MapPinned,
    },
    {
        title: "Chức vụ",
        url: "/admin/role",
        icon: UserCheck,
    },
    {
        title: "Quyền",
        url: "/admin/permission",
        icon: ShieldUser,
    },
    {
        title: "Cài đặt",
        url: "/admin/setting",
        icon: Settings,
    },
];

export function AdminSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarHeader className="items-center">
                    <SidebarTrigger />
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
