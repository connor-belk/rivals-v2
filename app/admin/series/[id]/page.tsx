import prisma from "@/lib/prisma";
import DeleteSeries from "./(components)/DeleteSeries";

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
            <th>Series</th>
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
                <td>{series.name}</td>
                <td>{r.startsAt.toString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
