interface User {
    id: string | number;
    username: string;
    gender?: string; // Optional
    email: string;
    password?: string; // Optional for updates
    dateOfBirth?: Date; // Optional
    address?: string; // Optional
    active: string; // Indicates if the user is active
    createdAt: Date;
}

interface Staff extends User {
    branchId: string | number; // Department the staff belongs to
    phone?: string; // Optional phone number
}
