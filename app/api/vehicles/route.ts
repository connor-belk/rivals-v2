import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const vehicles = await prisma.vehicle.findMany({
    where: {
      DivisionId: "e9548ff5-0a8f-4eec-92c6-65e8e9154a19",
    },
    select: {
      year: true,
      make: true,
      model: true,
      basePI: true,
      baseSpeed: true,
      baseAccel: true,
      baseBrake: true,
      baseHandling: true,
    },
  });

  const sortedWithSum = vehicles
    .map((v) => {
      const statTotal =
        Math.round(
          ((v.baseSpeed ?? 0) +
            (v.baseAccel ?? 0) +
            (v.baseBrake ?? 0) +
            (v.baseHandling ?? 0)) *
            100
        ) / 100;
      return {
        ...v,
        statTotal,
      };
    })
    .sort((a, b) => b.statTotal - a.statTotal);

  console.log("Sorted by statTotal...");
  return NextResponse.json(sortedWithSum);
}
