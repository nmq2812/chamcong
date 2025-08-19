export const permissionData: Array<Permission> = [
    {
        id: 1,
        name: "View Users",
        description: "Allows viewing user information",
        active: true,
    },
    {
        id: 2,
        name: "Edit Users",
        description: "Allows editing user information",
        active: true,
    },
    {
        id: 3,
        name: "Delete Users",
        description: "Allows deleting users",
        active: false,
    },
    {
        id: 4,
        name: "View Roles",
        description: "Allows viewing roles and permissions",
        active: true,
    },
    {
        id: 5,
        name: "Edit Roles",
        description: "Allows editing roles and permissions",
        active: true,
    },
];

export const roleData: Array<Role> = [
    {
        id: "1",
        name: "Admin",
        description: "Administrator with full access",
        permissions: [permissionData[0], permissionData[1], permissionData[2], permissionData[3], permissionData[4]],
        createdAt: new Date("2022-01-01"),
    },
    {
        id: "2",
        name: "Director",
        description: "Director with limited access",
        permissions: [permissionData[0], permissionData[1], permissionData[2], permissionData[3]],
        createdAt: new Date("2022-02-01"),
    },
    {
        id: "3",
        name: "Staff",
        description: "Staff with limited access",
        permissions: [permissionData[0], permissionData[1]],
        createdAt: new Date("2022-03-01"),
    },
];
