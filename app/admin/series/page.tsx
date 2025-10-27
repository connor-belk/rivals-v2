import prisma from "@/lib/prisma";
import SeriesTable from "./(components)/SeriesTable";

export default async function SeriesPage() {
  const divisions = await prisma.division
    .findMany({
      select: {
        id: true,
        name: true,
      },
    })
    .catch((err) => console.error(err));

  const series = await prisma.series.findMany({
    include: {
      division: true,
    },
  });

  return (
    <>
      <SeriesTable series={series} divisions={divisions} />
    </>
  );
}
