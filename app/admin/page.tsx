import prisma from "@/lib/prisma";
import AdminDataFetchHandler from "./AdminDataFetchHandler";
import CurrentSeriesCard from "./AdminDashboardCard";
import CurrentStandings from "./CurrentStandings";

export default async function AdminHomePage() {
  const divisions = await prisma.division.findMany({
    include: {},
  });
  const circuits = await prisma.circuit.findMany({
    include: {
      layout: true,
    },
  });

  return (
    <>
      <AdminDataFetchHandler divisions={divisions} circuits={circuits}>
        <div className="flex flex-col gap-5">
          <CurrentSeriesCard fromColor="from-red-700" toColor="to-blue-400">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="font-bold">Current Series:</p>
                <div className="flex gap-2">
                  <p>GT Touring Series</p>
                  <p>813</p>
                  <p>Modern Hot Hatch</p>
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
