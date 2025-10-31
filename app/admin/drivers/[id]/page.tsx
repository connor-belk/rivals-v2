import Link from "next/link";
import prisma from "@/lib/prisma";
import DriverForm from "../(components)/DriverForm";

interface Driver {
  id: string;
  firstName: string;
  lastName: string | null;
  gamertag: string;
  createdAt: Date;
  updatedAt: Date;
  number: number | null;
}

export default async function DriverDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const driver = await prisma.driver.findUnique({
    where: {
      id: id,
    },
  });

  if (!driver) {
    return (
      <div>
        <p>Driver not found.</p>
        <Link
          href="/admin/drivers"
          className="underline hover:text-blue-600 active:text-purple-600"
        >
          Return to Driver List
        </Link>
      </div>
    );
  }

  return (
    <>
      <p>{driver.firstName} Driver Details</p>
      <Link href={"/admin/drivers"} className="hover:cursor-pointer underline">
        Back to Driver List
      </Link>
      <DriverForm driver={driver} />
    </>
  );
}
