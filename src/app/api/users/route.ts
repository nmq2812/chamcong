import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createUserSchema } from "@/lib/validators";
import bcrypt from "bcrypt";
import { getErrorMessage } from "@/lib/errors";

export const runtime = "nodejs";

export async function GET() {
    const users = await prisma.user.findMany({
        orderBy: { id: "asc" },
        include: { userRoles: { include: { role: true } } },
    });
    return NextResponse.json(users);
}

export async function POST(req: Request) {
    try {
        const data = createUserSchema.parse(await req.json());
        const hashed = data.password
            ? await bcrypt.hash(data.password, 10)
            : null;

        const user = await prisma.user.create({
            data: {
                name: data.name,
                gender: data.gender ?? null,
                email: data.email ?? null,
                password: hashed ?? null,
                dateOfBirth: data.dateOfBirth
                    ? new Date(data.dateOfBirth)
                    : null,
                address: data.address ?? null,
                active: data.active === "active" ? true : false,
                userRoles: {
                    create: data.roleIds.map((rid) => ({ roleId: rid })),
                },
            },
            include: { userRoles: { include: { role: true } } },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (e: unknown) {
        return NextResponse.json(
            { error: getErrorMessage(e) },
            { status: 400 },
        );
    }
}
