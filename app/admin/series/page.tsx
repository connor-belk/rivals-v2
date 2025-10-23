import SeriesForm from "./SeriesForm";
import prisma from "@/lib/prisma";

export default async function SeriesPage() {
  const divisions = await prisma.division
    .findMany({
      select: {
        id: true,
        name: true,
      },
    })
    .catch((err) => console.error(err));

  const series = [
    { id: 1, name: "Series 1" },
    { id: 2, name: "Series 2" },
    { id: 3, name: "Series 3" },
  ];

  return <SeriesForm series={series} divisions={divisions} />;
}
