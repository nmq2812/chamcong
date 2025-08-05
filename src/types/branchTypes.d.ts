/**
 * Interface representing a branch entity
 */
interface Branch {
    id: string;
    name: string;
    address?: string;
    isActive: string;
    createdAt: Date;
}