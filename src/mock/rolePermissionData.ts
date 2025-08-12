export const permissionData: Array<Permission> = [
    {
        id: "view_users",
        name: "View Users",
        description: "Allows viewing user information",
        activeStatus: "ACTIVE",
    },
    {
        id: "edit_users",
        name: "Edit Users",
        description: "Allows editing user information",
        activeStatus: "ACTIVE",
    },
    {
        id: "delete_users",
        name: "Delete Users",
        description: "Allows deleting users",
        activeStatus: "INACTIVE",
    },
    {
        id: "view_roles",
        name: "View Roles",
        description: "Allows viewing roles and permissions",
        activeStatus: "ACTIVE",
    },
    {
        id: "edit_roles",
        name: "Edit Roles",
        description: "Allows editing roles and permissions",
        activeStatus: "ACTIVE",
    },
];
export const roleData: Array<Role> = [
    {
        id: "1",
        name: "Admin",
        description: "Administrator with full access",
        permissions: [permissionData[0], permissionData[1], permissionData[2], permissionData[3], permissionData[4]],
        createdAt: new Date("2022-01-01"),
        updatedAt: new Date("2022-01-01"),
    },
    {
        id: "2",
        name: "Director",
        description: "Director with limited access",
        permissions: [permissionData[0], permissionData[1], permissionData[2], permissionData[3]],
        createdAt: new Date("2022-02-01"),
        updatedAt: new Date("2022-02-01"),
    },
    {
        id: "3",
        name: "Staff",
        description: "Staff with limited access",
        permissions: [permissionData[0], permissionData[1]],
        createdAt: new Date("2022-03-01"),
        updatedAt: new Date("2022-03-01"),
    },
];
