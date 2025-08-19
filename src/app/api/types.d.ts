interface PermissionDTO {
    id: number;
    name: string;
    description: Nullable<string>;
    active: boolean;
    createdAt: Date;
}

interface RoleDTO {
    id: number;
    name: string;
    description: Nullable<string>;
    active: boolean;
    createdAt: Date;
}

interface RolePermissionDTO {
    id: number;
    permissionId: number;
    roleId: number;
    createdAt: Date;
}

interface BranchDTO {
    id: number;
    name: string;
    address: Nullable<string>;
    active: boolean;
    createdAt: Date;
}

interface DeviceDTO {
    id: number;
    branchId: number;
    name: string;
    active: boolean;
    createdAt: Date; // theo DB hiện tại là varchar(255)
}

interface UserDTO {
    id: number;
    name: string;
    gender: Nullable<string>;
    email: Nullable<string>;
    password: Nullable<string>;
    dateOfBirth: Nullable<DateISO>;
    address: Nullable<string>;
    active: Nullable<string>;
    createdAt: Date;
}

interface UserRoleDTO {
    id: number;
    roleId: number;
    userId: number;
    createdAt: Date;
}

interface UserCheckDTO {
    id: number;
    userId: number;
    deviceId: number;
    time: Nullable<DateISO>; // DB hiện dùng DATE
    image: Nullable<string>;
    actionType: Nullable<string>;
    verificationStatus: Nullable<string>;
    active: Nullable<string>;
    createdAt: Date;
}

/* ===== Expanded DTOs (khi include quan hệ trong Prisma) ===== */

interface RolePermissionExpandedDTO extends RolePermissionDTO {
    permission: PermissionDTO;
    role: RoleDTO;
}

interface RoleWithPermissionsDTO extends RoleDTO {
    rolePermissions: RolePermissionExpandedDTO[];
}

interface UserRoleExpandedDTO extends UserRoleDTO {
    role: RoleDTO;
    user?: UserDTO; // thường bạn chỉ include role trong /users
}

interface UserWithRolesDTO extends UserDTO {
    userRoles: UserRoleExpandedDTO[];
}

interface DeviceWithBranchDTO extends DeviceDTO {
    branch: BranchDTO;
}

interface BranchWithDevicesDTO extends BranchDTO {
    devices: DeviceDTO[];
}

interface UserCheckExpandedDTO extends UserCheckDTO {
    user: UserDTO;
    device: DeviceWithBranchDTO; // device + branch
}
