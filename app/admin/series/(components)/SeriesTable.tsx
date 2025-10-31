"use client";

import { useState } from "react";
import Link from "next/link";
import CreateSeriesSlider from "./CreateSeriesSlider";
import { Switch } from "@headlessui/react";

export default function SeriesTable({
  series,
  divisions,
}: {
  series: any;
  divisions: any;
}) {
  const [rows, setRows] = useState(series);

  const handleSwitchToggle = async (id: string) => {
    setRows((prev: any) =>
      prev.map((s: any) =>
        s.id === id ? { ...s, isCurrent: !s.isCurrent } : s
      )
    );

    const res = await fetch("http://localhost:3000/api/series/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        isCurrent: JSON.stringify(
          !rows.find((r: any) => r.id === id)?.isCurrent
        ),
      }),
    });

    console.log(await res.json());
  };

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
            <thead className="bg-gray-900 px-4 w-screen">
              <tr className="border-b border-b-white/15">
                <th
                  scope="col"
                  className="relative isolate py-3.5 px-3 text-left text-sm font-semibold text-white"
                >
                  Title
                  {/* <div className="absolute inset-y-0 right-full -z-10 max-w-full border-b border-b-white/15" /> */}
                  {/* <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-white/15" /> */}
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
              {rows.map((s: any) => (
                <tr key={s.id} className="border-b border-b-white/15">
                  <td className="relative py-4 px-3 text-sm font-medium text-white">
                    {s.name}
                    {/* <div className="absolute right-full bottom-0 h-px bg-white/10" /> */}
                    {/* <div className="absolute bottom-0 left-0 h-px w-screen bg-white/10" /> */}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-400 sm:table-cell">
                    {s.division.name}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-400 md:table-cell">
                    {s.PImax}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-400">
                    <Switch
                      checked={s.isCurrent}
                      onChange={() => handleSwitchToggle(s.id)}
                      className={`group relative flex h-7 w-14 cursor-pointer rounded-full p-1 transition-colors duration-200 ${
                        s.isCurrent ? "bg-green-500" : "bg-white/10"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block size-5 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          s.isCurrent ? "translate-x-7" : "translate-x-0"
                        }`}
                      />
                    </Switch>
                  </td>
                  <td className="py-4 px-3 text-right text-sm font-medium">
                    <Link
                      href={`/admin/series/${s.id}`}
                      className="text-indigo-400 hover:text-indigo-300"
                      prefetch={true}
                    >
                      Edit<span className="sr-only">, {s.id}</span>
                    </Link>
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
