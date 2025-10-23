import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const firstCar = await prisma.vehicle.findFirst();

  console.log(firstCar);
  return NextResponse.json(await prisma.vehicle.findFirst());
}

export async function POST(req: Request) {
  const data = await req.json();
  const divisionId = data.divisionId;
  const PImax = data.PImax;
  let name = data.name;

  const divisionName = await prisma.division.findUnique({
    where: {
      id: divisionId,
    },
    select: {
      name: true,
    },
  });

  if (!divisionId || !PImax || divisionId === "" || PImax === "") {
    return NextResponse.json({ error: "Division ID or PImax is required." });
  } else if (
    typeof divisionId !== "string" ||
    typeof PImax !== "string" ||
    typeof name !== "string"
  ) {
    return NextResponse.json({ error: "Division ID or PImax is invalid." });
  } else if (PImax.length > 3) {
    return NextResponse.json({
      error: "PImax must be no more than 3 characters.",
    });
  } else if (name.length > 255) {
    return NextResponse.json({
      error: "Series name must be no more than 255 characters.",
    });
  } else if (!name || name === "") {
    name = `${divisionName!.name} at ${PImax}PI Series`;
  }

  const newData = {
    divisionId,
    PImax,
    name,
    division: divisionName!.name,
  };

  const newSeries = await prisma.series
    .create({
      data: {
        divisionId: newData.divisionId,
        PImax: newData.PImax,
        name: newData.name,
      },
    })
    .catch((err) => console.error(err));

  return NextResponse.json(newSeries);
}
