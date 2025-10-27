import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();
  console.log(data);
  return NextResponse.json({ message: data });
}

export async function DELETE(req: Request) {
  const data = await req.json();
  console.log(data);
  return NextResponse.json({ message: data });
}

export async function PUT(req: Request) {
  const data = await req.json();
  console.log(data);
  return NextResponse.json({ message: data });
}
