import AdminNav from "./AdminNav";
import SeriesForm from "./series/SeriesForm";
import prisma from "@/lib/prisma";

export default async function AdminHomePage() {
  const divisions = await prisma.division
    .findMany()
    .catch((err) => console.error(err));

  const series = await prisma.series
    .findMany()
    .catch((err) => console.error(err));

  return (
    <>
      <div>Hello</div>
    </>
  );
}
