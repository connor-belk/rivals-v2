import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const drivers = await prisma.driver.findMany().catch((err) => {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong.", status: 500 });
  });
  return NextResponse.json(drivers);
}

export async function POST(req: Request) {
  const data = await req.json();

  if (!data.firstName || !data.gamertag || !data.number) {
    return NextResponse.json({
      error: "First name, gamertag, and number are required.",
      status: 400,
    });
  }

  console.log(
    `POST request received for driver: ${data.firstName}, gamertag: ${data.gamertag} at #${data.number}.`
  );
  const newDriver = await prisma.driver.create({
    data: data,
  });
  console.log(`created driver: ${newDriver.firstName}`);

  return NextResponse.json(newDriver);
}

export async function PUT(req: Request) {
  const data = await req.json();
  if (!data.id || !data.firstName || !data.gamertag) {
    return NextResponse.json({
      error: "First name, gamertag, and number are required.",
      status: 400,
    });
  }

  const updateDriver = await prisma.driver.update({
    where: {
      id: data.id,
    },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      gamertag: data.gamertag,
      number: parseInt(data.number),
    },
  });
  return NextResponse.json({ data, updateDriver });
}

export async function DELETE(req: Request) {
  const data = await req.json();
  return NextResponse.json({
    data,
    message: "Not yet implemented.",
    status: 405,
  });
}

export async function PATCH(req: Request) {
  return NextResponse.json({ error: "Not allowed.", status: 405 });
}

export async function OPTIONS(req: Request) {
  return NextResponse.json({ error: "Not allowed.", status: 405 });
}
