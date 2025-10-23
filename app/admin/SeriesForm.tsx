// TODO: Form > division, PImax, title,
// TODO: Need division names and (hidden ID) information for searchable dropdown
"use client";

// import { useState } from "react";
import { toast } from "react-toastify";
import prisma from "@/lib/prisma";

export default function SeriesForm({
  series,
  divisions,
}: {
  series: any;
  divisions: any;
}) {
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form as HTMLFormElement);
    const divisionId = formData.get("division") as string;
    const PImax = formData.get("PImax") as string;
    const title = formData.get("title") as string;

    const seriesData = {
      divisionId,
      PImax,
      name: title,
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
      <form onSubmit={handleFormSubmit}>
        <p>Create a New Series</p>
        <label htmlFor="division">Division</label>
        <select
          name="division"
          id="division"
          className="border px-4 py-1 rounded-lg bg-black"
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
        <label htmlFor="PImax">PImax</label>
        <input
          name="PImax"
          type="text"
          placeholder="'913' or 'B'"
          className="border px-4 py-1 rounded-lg"
          required
        />

        <label htmlFor="title">Title:</label>
        <input
          name="title"
          type="text"
          placeholder="Series Title (optional)"
          className="border px-4 py-1 rounded-lg"
        />

        <button type="submit" className="px-4 py-1 rounded-lg bg-blue-600">
          Submit
        </button>
      </form>
    </>
  );
}
