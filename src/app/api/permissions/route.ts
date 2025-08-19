import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getErrorMessage } from "@/lib/errors";

export const runtime = "nodejs";

export async function GET() {
    const permissions = await prisma.permission.findMany({
        orderBy: { id: "asc" },
    });
    return NextResponse.json(permissions);
}
export async function POST(req: Request) {
    try {
        const data = await req.json();
        const permission = await prisma.permission.create({
            data: {
                name: data.name,
                description: data.description ?? null,
                active: data.active === "active" ? true : false,
            },
        });
        return NextResponse.json(permission, { status: 201 });
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
        const permission = await prisma.permission.update({
            where: { id: data.id },
            data: {
                name: data.name,
                description: data.description ?? null,
                active: data.active === "active" ? true : false,
            },
        });
        return NextResponse.json(permission, { status: 200 });
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
        const permission = await prisma.permission.delete({
            where: { id },
        });
        return NextResponse.json(permission, { status: 200 });
    } catch (e: unknown) {
        return NextResponse.json(
            { error: getErrorMessage(e) },
            { status: 400 },
        );
    }
}
