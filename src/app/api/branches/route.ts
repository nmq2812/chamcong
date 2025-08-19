import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
    const branches = await prisma.branch.findMany({
        include: { devices: true },
        orderBy: { id: "asc" },
    });
    return NextResponse.json(branches.map((branch: BranchDTO) => ({
        id: branch.id,
        name: branch.name,
        address: branch.address ?? null,
        active: branch.active,
        createdAt: branch.createdAt,
    })));
}
export async function POST(req: Request) {
    try {
        const data = await req.json();
        const branch = await prisma.branch.create({
            data: {
                name: data.name,
                address: data.address ?? null,
                active: data.active ?? "active",
            },
            include: { devices: true },
        });
        return NextResponse.json(branch, { status: 201 });
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
        const branch = await prisma.branch.update({
            where: { id: data.id },
            data: {
                name: data.name,
                address: data.address ?? null,
                active: data.active ?? "active",
            },
            include: { devices: true },
        });
        return NextResponse.json(branch, { status: 200 });
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
        const branch = await prisma.branch.delete({
            where: { id },
        });
        return NextResponse.json(branch, { status: 200 });
    } catch (e: any) {
        return NextResponse.json(
            { error: e?.message ?? "Bad Request" },
            { status: 400 },
        );
    }
}