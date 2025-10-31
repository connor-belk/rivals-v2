import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const divisions = await prisma.division.findMany();
  const circuits = await prisma.circuit.findMany({
    include: {
      layout: true,
    },
  });
  const vehicles = await prisma.vehicle.findMany();
  const drivers = await prisma.driver.findMany();

  return NextResponse.json({
    divisions,
    circuits,
    vehicles,
    drivers,
  });
}
