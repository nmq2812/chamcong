import { Calendar, ContactRound, Home, Inbox, MapPinned, MessageCircleWarning, Search, Settings, ShieldUser, UserCheck } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Nhân viên",
    url: "#",
    icon: ContactRound ,
  },
  {
    title: "Chi nhánh",
    url: "#",
    icon: MapPinned,
  },
  {
    title: "Chức vụ",
    url: "#",
    icon: UserCheck ,
  },
  {
    title: "Quyền",
    url: "#",
    icon: ShieldUser,
  },
  {
    title: "Thông báo",
    url: "#",
    icon: MessageCircleWarning,
  },
]

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
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
  )
}