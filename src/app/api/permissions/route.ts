import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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
                active: data.active ?? "active",
            },
        });
        return NextResponse.json(permission, { status: 201 });
    } catch (e: any) {
        return NextResponse.json(
            { error: e?.message ?? "Bad Request" },
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
                active: data.active ?? "active",
            },
        });
        return NextResponse.json(permission, { status: 200 });
    } catch (e: any) {
        return NextResponse.json(
            { error: e?.message ?? "Bad Request" },
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
    } catch (e: any) {
        return NextResponse.json(
            { error: e?.message ?? "Bad Request" },
            { status: 400 },
        );
    }
}
