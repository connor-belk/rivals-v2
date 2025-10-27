import React from "react";
import CreateSeriesSlider from "./CreateSeriesSlider";

export default function SeriesTable({
  series,
  divisions,
}: {
  series: any;
  divisions: any;
}) {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-white">Series Table</h1>
            <p className="mt-2 text-sm text-gray-300">
              A list of all of the racing series both past, present, and future.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <CreateSeriesSlider series={series} divisions={divisions} />
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <table className="w-full text-left">
            <thead className="bg-gray-900 px-4">
              <tr>
                <th
                  scope="col"
                  className="relative isolate py-3.5 px-3 text-left text-sm font-semibold text-white"
                >
                  Title
                  <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-white/15" />
                  <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-white/15" />
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-white sm:table-cell"
                >
                  Division
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-white md:table-cell"
                >
                  Class/PI max
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                >
                  Current
                </th>
                <th scope="col" className="py-3.5 px-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {series.map((s: any) => (
                <tr key={s.id}>
                  <td className="relative py-4 px-3 text-sm font-medium text-white">
                    {s.name}
                    <div className="absolute right-full bottom-0 h-px w-screen bg-white/10" />
                    <div className="absolute bottom-0 left-0 h-px w-screen bg-white/10" />
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-400 sm:table-cell">
                    {s.division.name}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-400 md:table-cell">
                    {s.PImax}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-400">
                    {s.isCurrent ? "🟢" : "🔴"}
                  </td>
                  <td className="py-4 px-3 text-right text-sm font-medium">
                    <a
                      href={`/admin/series/${s.id}`}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      Edit<span className="sr-only">, {s.id}</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
