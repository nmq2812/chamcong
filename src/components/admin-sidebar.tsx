import {
    ContactRound,
    Home,
    MapPinned,
    ShieldUser,
    UserCheck,
    Camera,
    Settings,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import useLanguage from "@/hooks/use-language";
import { translate } from "@/lib/translate/translate";

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: Home,
    },
    {
        title: "Staff",
        url: "/admin/staff",
        icon: ContactRound,
    },
    {
        title: "Device",
        url: "/admin/device",
        icon: Camera,
    },
    {
        title: "Branch",
        url: "/admin/branch",
        icon: MapPinned,
    },
    {
        title: "Role",
        url: "/admin/role",
        icon: UserCheck,
    },
    {
        title: "Permission",
        url: "/admin/permission",
        icon: ShieldUser,
    },
    {
        title: "Settings",
        url: "/admin/setting",
        icon: Settings,
    },
];

export function AdminSidebar() {
    const {language, changeLanguage} = useLanguage();

    return (
        <Sidebar collapsible="icon" className="checkin-sidebar">
            <SidebarHeader className="items-center">
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{translate(item.title)}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            {language === "vi" ? "Tiếng Việt" : "English"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => changeLanguage("en")}>
                            English
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeLanguage("vi")}>
                            Tiếng Việt
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
