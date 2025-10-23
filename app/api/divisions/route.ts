import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const divisions = await prisma.division.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return NextResponse.json(divisions);
}
