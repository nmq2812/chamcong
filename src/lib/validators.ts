import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(1),
    gender: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    dateOfBirth: z.string().optional(), // ISO date (YYYY-MM-DD)
    address: z.string().optional(),
    active: z.string().optional(),
    roleIds: z.array(z.number().int()).default([]),
});

export const createRoleSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    active: z.string().optional(),
    permissionIds: z.array(z.number().int()).default([]),
});

export const createUserCheckSchema = z.object({
    userId: z.number().int(),
    deviceId: z.number().int(),
    time: z.string().optional(), // 'YYYY-MM-DD' theo cột DATE
    image: z.string().optional(),
    actionType: z.string().optional(),
    verificationStatus: z.string().optional(),
    active: z.string().optional(),
});
