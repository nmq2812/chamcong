export const roleData: Array<Role> = [
    {
        id: "1",
        name: "Admin",
        description: "Administrator with full access",
        permissions: ["view_users", "edit_users", "delete_users", "view_roles", "edit_roles"],
        createdAt: new Date("2022-01-01").toISOString(),
        updatedAt: new Date("2022-01-01").toISOString(),
    },
    {
        id: "2",
        name: "Director",
        description: "Director with limited access",
        permissions: ["view_users", "edit_users", "delete_users", "view_roles"],
        createdAt: new Date("2022-02-01").toISOString(),
        updatedAt: new Date("2022-02-01").toISOString(),
    },
    {
        id: "3",
        name: "Staff",
        description: "Staff with limited access",
        permissions: ["view_users", "view_roles"],
        createdAt: new Date("2022-03-01").toISOString(),
        updatedAt: new Date("2022-03-01").toISOString(),
    },
]