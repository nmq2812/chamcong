interface User {
    id: string;
    email: string;
    name: string;
    address?: string;
    dateOfBirth?: Date;
    gender?: "mail" | "female";
    active: boolean;
    createdAt: Date;
    roles?: string[];
}

interface Staff extends User {
    branchId: string | number;
}

interface Role {
    id: string;
    name: string;
    permissions?: Permission[];
    createdAt?: Date;
    description?: string;
}

interface Permission {
    id: number;
    name: string;
    description?: string;
    active: boolean;
}

interface RolePermission {
    id: string;
    roleId: string;
    permissionId: string;
    role?: Role;
    permission?: Permission;
}

interface Branch {
    id: number;
    name: string;
    address: string;
    active: boolean;
    createdAt: Date;
}

interface Device {
    id: string;
    name: string;
    branchId: number;
    branch?: Branch;
    active: boolean;
    createdAt: Date;
}

interface DeviceDisplay extends Device {
    branchName: string;
}

interface CheckIn {
    id: string;
    userId: string;
    actualUser?: User;
    recognizeUser?: User;
    deviceId: string;
    device?: Device;
    time: string;
    confident: number;
    image: string;
    verificationStatus: "PENDING" | "APPROVED" | "REJECTED" | "FAKE";
}

interface AuthResponse {
    access_token: string;
    refresh_token: string;
}

interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

enum JobType {
    SYNC_HRM = "SYNC_HRM",
}

enum JobStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
}

interface JobResponse {
    id: string;
    jobType: JobType;
    jobStatus: JobStatus;
    description?: string;
    createdDate: string;
    modifiedDate: string;
}
