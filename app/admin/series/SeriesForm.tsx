// TODO: Form > division, PImax, title,
// TODO: Need division names and (hidden ID) information for searchable dropdown
"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";
import { toast } from "react-toastify";
import prisma from "@/lib/prisma";

export default function SeriesForm({
  series,
  divisions,
}: {
  series: any;
  divisions: any;
}) {
  const [isCurrent, setIsCurrent] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form as HTMLFormElement);
    const divisionId = formData.get("division") as string;
    const PImax = formData.get("PImax") as string;
    const title = formData.get("title") as string;
    const isCurrent = formData.get("isCurrent");

    const seriesData = {
      divisionId,
      PImax,
      name: title,
      isCurrent,
    };

    const res = await fetch("/api/series", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(seriesData),
    });

    if (res.ok) {
      toast.success("Series created successfully!");
    } else {
      toast.error("Error creating series.");
    }

    // console.log(await res.json());

    form.reset();
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col justify-center gap-y-4 max-w-xl mx-auto"
      >
        <p className="text-center">Create a New Series</p>
        <section className="flex gap-3 w-full items-center">
          <label htmlFor="division">Division</label>
          <select
            name="division"
            id="division"
            className="border px-4 py-1 rounded-lg bg-black flex-2"
            required
          >
            <option value="">Select Division</option>
            {divisions.map((division: any) => {
              return (
                <option value={division.id} key={division.id}>
                  {division.name}
                </option>
              );
            })}
          </select>
        </section>
        <section className="flex gap-3 w-full items-center">
          <label htmlFor="PImax">PImax</label>
          <input
            name="PImax"
            type="text"
            placeholder="'913' or 'B'"
            className="border px-4 py-1 rounded-lg flex-2"
            required
          />
        </section>

        <section className="flex gap-3 w-full items-center">
          <label htmlFor="title">Title:</label>
          <input
            name="title"
            type="text"
            placeholder="Series Title (optional)"
            className="border px-4 py-1 rounded-lg flex-2"
          />
        </section>

        <section className="flex items-center gap-3 w-full">
          <label htmlFor="isCurrent">Current:</label>
          <Switch
            checked={isCurrent}
            onChange={setIsCurrent}
            className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-green-500 data-focus:outline data-focus:outline-white"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
            />
          </Switch>
          <button
            type="submit"
            className="px-4 py-1 rounded-lg bg-blue-600 flex-2 hover:cursor-pointer hover:bg-blue-700"
          >
            Submit
          </button>
        </section>
      </form>
    </>
  );
}
