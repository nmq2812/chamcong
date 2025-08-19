import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function parseList(param?: string | null) {
    return (param ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const includeList = parseList(url.searchParams.get("include"));
    const roleFields = parseList(url.searchParams.get("fields[role]"));
    const permFields = parseList(url.searchParams.get("fields[permission]"));

    const includeRole = includeList.includes("role");
    const includePermission = includeList.includes("permission");

    const roleSelect =
        roleFields.length > 0
            ? Object.fromEntries(roleFields.map((k) => [k, true]))
            : { id: true, name: true };

    const permissionSelect =
        permFields.length > 0
            ? Object.fromEntries(permFields.map((k) => [k, true]))
            : { id: true, name: true };

    const data = await prisma.rolePermission.findMany({
        select: {
            id: true,
            roleId: true,
            permissionId: true,
            ...(includeRole && { role: { select: roleSelect } }),
            ...(includePermission && {
                permission: { select: permissionSelect },
            }),
        },
        orderBy: { id: "asc" },
    });

    return NextResponse.json(data);
}
