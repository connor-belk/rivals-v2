import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const firstCar = await prisma.vehicle.findFirst();

  console.log(firstCar);
  return NextResponse.json(await prisma.vehicle.findFirst());
}
