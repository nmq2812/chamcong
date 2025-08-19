import { map } from "./../../../../node_modules/effect/src/Cause";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createRoleSchema } from "@/lib/validators";
import { getErrorMessage } from "@/lib/errors";

export const runtime = "nodejs";

export async function GET() {
    const rolePermissions = await prisma.rolePermission.findMany({
        include: { permission: true },
    });
    const roles = await prisma.role.findMany({
        orderBy: { id: "asc" },
        include: { rolePermissions: { include: { permission: true } } },
    });

    return NextResponse.json(
        roles.map((role: RoleDTO) => ({
            id: role.id,
            name: role.name,
            description: role.description,
            active: role.active,
            permissionIds: rolePermissions
                .filter((pid: RolePermissionDTO) => {
                    return pid.roleId === role.id;
                })
                .map((pid: RolePermissionDTO) => pid.permissionId)
                .filter(Boolean),
            createdAt: role.createdAt,
        })),
    );
}

export async function POST(req: Request) {
    try {
        const data = createRoleSchema.parse(await req.json());
        const role = await prisma.role.create({
            data: {
                name: data.name,
                description: data.description ?? null,
                active: data.active ?? "active",
                rolePermissions: {
                    create: data.permissionIds.map((pid) => ({
                        permissionId: pid,
                    })),
                },
            },
            include: { rolePermissions: { include: { permission: true } } },
        });
        return NextResponse.json(role, { status: 201 });
    } catch (e: unknown) {
        return NextResponse.json(
            { error: getErrorMessage(e) },
            { status: 400 },
        );
    }
}

export async function PUT(req: Request) {
    try {
        const data = await req.json();
        const role = await prisma.role.update({
            where: { id: data.id },
            data: {
                name: data.name,
                description: data.description ?? null,
                active: data.active ?? "active",
                rolePermissions: {
                    deleteMany: {},
                    create: data.permissionIds.map((pid: string) => ({
                        permissionId: pid,
                    })),
                },
            },
            include: { rolePermissions: { include: { permission: true } } },
        });
        return NextResponse.json(role, { status: 200 });
    } catch (e: unknown) {
        return NextResponse.json(
            { error: getErrorMessage(e) },
            { status: 400 },
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const role = await prisma.role.delete({ where: { id } });
        return NextResponse.json(role, { status: 200 });
    } catch (e: unknown) {
        return NextResponse.json(
            { error: getErrorMessage(e) },
            { status: 400 },
        );
    }
}
