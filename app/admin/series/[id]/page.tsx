import prisma from "@/lib/prisma";
import DeleteSeries from "./(components)/DeleteSeries";
import Link from "next/link";
import UpdateSeriesForm from "./(components)/UpdateSeriesForm";

export default async function SeriesDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const series = await prisma.series.findUnique({
    where: {
      id: id,
    },
    include: {
      division: true,
      races: true,
    },
  });

  if (!series) {
    return (
      <div>
        <p>Series not found.</p>
        <Link
          href="/admin/series"
          className="underline hover:text-blue-600 active:text-purple-600"
        >
          Return to Series Table
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p>{series!.name}</p>
      <p>{series!.division.name}</p>
      <p>{series!.PImax}</p>
      <p>{series!.isCurrent ? "🟢" : "🔴"}</p>
      <p>{series!.races.length} Races</p>

      <DeleteSeries params={params} />
      <table>
        <thead>
          <tr>
            <th>Track</th>
            <th>Layout</th>
            <th>Laps</th>
            <th>Start Time</th>
          </tr>
        </thead>
        <tbody>
          {series.races.map((r) => {
            return (
              <tr key={r.id}>
                <td>{r.track}</td>
                <td>{r.layoutId}</td>
                <td>{r.laps}</td>
                <td>{r.startsAt.toString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <UpdateSeriesForm series={series} />
    </div>
  );
}
