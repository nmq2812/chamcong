import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createUserCheckSchema } from "@/lib/validators";
import { getErrorMessage } from "@/lib/errors";

export const runtime = "nodejs";

export async function GET() {
    const checks = await prisma.userCheck.findMany({
        orderBy: { id: "desc" },
        include: { user: true, device: { include: { branch: true } } },
    });
    return NextResponse.json(checks);
}

export async function POST(req: Request) {
    try {
        const data = createUserCheckSchema.parse(await req.json());
        const created = await prisma.userCheck.create({
            data: {
                userId: data.userId,
                deviceId: data.deviceId,
                time: data.time ? new Date(data.time) : null,
                image: data.image ?? null,
                actionType: data.actionType ?? "checkin",
                verificationStatus: data.verificationStatus ?? "success",
                active: data.active === "active" ? true : false,
            },
        });
        return NextResponse.json(created, { status: 201 });
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
        const updated = await prisma.userCheck.update({
            where: { id: data.id },
            data: {
                userId: data.userId,
                deviceId: data.deviceId,
                time: data.time ? new Date(data.time) : null,
                image: data.image ?? null,
                actionType: data.actionType ?? "checkin",
                verificationStatus: data.verificationStatus ?? "success",
                active: data.active ?? "active",
            },
        });
        return NextResponse.json(updated, { status: 200 });
    } catch (e: unknown) {
        return NextResponse.json(
            { error: getErrorMessage(e) },
            { status: 400 },
        );
    }
}
