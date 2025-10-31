import prisma from "@/lib/prisma";
import AdminDataFetchHandler from "./(components)/AdminDataFetchHandler";
import CurrentSeriesCard from "./(components)/AdminDashboardCard";
import CurrentStandings from "./(components)/CurrentStandings";

export default async function AdminHomePage() {
  const currentSeries = await prisma.series.findFirst({
    where: {
      isCurrent: true,
    },
    include: {
      division: true,
    },
  });

  return (
    <>
      <AdminDataFetchHandler>
        <div className="flex flex-col gap-5">
          <CurrentSeriesCard fromColor="from-red-700" toColor="to-blue-400">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="font-bold">Current Series:</p>
                <div className="flex gap-2">
                  <p>{currentSeries!.name}</p>
                  <p>{currentSeries!.PImax}</p>
                  <p>{currentSeries!.division.name}</p>
                </div>
              </div>
            </div>
          </CurrentSeriesCard>
          <CurrentStandings />
        </div>
      </AdminDataFetchHandler>
    </>
  );
}
