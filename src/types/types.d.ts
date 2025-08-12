interface User {
    id: string;
    email: string;
    phone?: string;
    username: string;
    address?: string;
    dateOfBirth?: Date;
    gender?: "MALE" | "FEMALE";
    active: "ACTIVE" | "INACTIVE";
    createdAt: Date;
    modifiedDate: Date;
    roles?: string[];
}

interface Staff extends User {
    branchId: string | number; // Department the staff belongs to
}

interface Role {
    id: string;
    name: string;
    permissions?: Permission[];
    createdAt?: Date;
    updatedAt?: Date;
    description?: string;
}

interface Permission {
    id: string;
    name: string;
    description?: string;
    activeStatus: "ACTIVE" | "INACTIVE";
}

interface Branch {
    id: string;
    name: string;
    address: string;
    activeStatus: "ACTIVE" | "INACTIVE";
}

interface Device {
    id: string;
    name: string;
    branchId: string;
    branch?: Branch;
    activeStatus: "ACTIVE" | "INACTIVE";
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
