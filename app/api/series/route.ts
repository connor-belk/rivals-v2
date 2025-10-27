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
  let isCurrent = data.isCurrent;

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
  }

  const divisionName = await prisma.division.findUnique({
    where: {
      id: divisionId,
    },
    select: {
      name: true,
    },
  });

  if (!name || name === "") {
    name = `${divisionName!.name} at ${PImax}PI Series`;
  }

  if (isCurrent === "on") {
    isCurrent = true;
  } else {
    isCurrent = false;
  }

  const newData = {
    divisionId,
    PImax,
    name,
    isCurrent,
    division: divisionName!.name,
  };

  const newSeries = await prisma.series
    .create({
      data: {
        divisionId: newData.divisionId,
        PImax: newData.PImax,
        name: newData.name,
        isCurrent: newData.isCurrent,
      },
    })
    .catch((err) => console.error(err));

  return NextResponse.json(newSeries);
}

export async function DELETE(req: Request) {
  const data = await req.json();
  console.log(data);

  const deletedSeries = await prisma.series.delete({
    where: {
      id: data.id,
    },
  });

  return NextResponse.json({ message: data });
}
