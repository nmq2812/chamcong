import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getErrorMessage } from "@/lib/errors";

export const runtime = "nodejs";

export async function GET() {
    const devices = await prisma.device.findMany({
        include: { branch: true },
        orderBy: { id: "asc" },
    });
    return NextResponse.json(devices);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const device = await prisma.device.create({
            data: {
                name: body.name,
                active: body.active ?? "active",
                createdAt: body.createdAt ?? null,
                branchId: Number(body.branchId),
            },
        });
        return NextResponse.json(device, { status: 201 });
    } catch (e: unknown) {
        return NextResponse.json(
            { error: getErrorMessage(e) }, { status: 400 },
        );
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const device = await prisma.device.update({
            where: { id: body.id },
            data: {
                name: body.name,
                active: body.active ?? "active",
                createdAt: body.createdAt ?? null,
                branchId: Number(body.branchId),
            },
        });
        return NextResponse.json(device, { status: 200 });
    } catch (e: unknown) {
        return NextResponse.json(
            { error: getErrorMessage(e) }, { status: 400 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const device = await prisma.device.delete({ where: { id } });
        return NextResponse.json(device, { status: 200 });
    } catch (e: unknown) {
        return NextResponse.json(
            { error: getErrorMessage(e) }, { status: 400 }
        );
    }
}
