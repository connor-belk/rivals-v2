import AdminNav from "./AdminNav";
import SeriesForm from "./SeriesForm";
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
      <AdminNav />
      <div>
        {/* Main area of content, based on ids */}
        <main className="lg:pl-72">
          <div className="">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
              <SeriesForm series={series} divisions={divisions} />
            </div>
          </div>
        </main>

        {/* <aside className="fixed inset-y-0 left-72 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block dark:border-white/10"> */}
        {/* Secondary column (hidden on smaller screens) */}
        {/* </aside> */}
      </div>
    </>
  );
}
