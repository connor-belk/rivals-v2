"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@headlessui/react";

export default function DriverForm({ series }: { series: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...series,
    isCurrent: series.isCurrent ?? false,
  });
  const [isCurrent, setIsCurrent] = useState(false);
  const [status, setStatus] = useState("");
  const router = useRouter();

  const adminData = JSON.parse(localStorage.getItem("adminData") || "{}");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = (checked: boolean) => {
    setFormData({ ...formData, isCurrent: checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving...");

    const res = await fetch(`/api/series/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus("Saved!");
      setIsEditing(false);
    } else {
      setStatus("Error saving data.");
    }

    console.log(await res.json());
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Deleting...");
    setIsEditing(false);
    const res = await fetch(`/api/series/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(series.id),
    });

    if (res.ok) {
      setStatus("Deleted!");
      setIsEditing(false);
      setTimeout(() => {
        router.push("/admin/drivers");
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg max-w-96 mx-auto mt-5"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{series.name} Details</h2>
        <button
          type="button"
          onClick={handleDelete}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium">Series Name</label>
        <input
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border p-2 rounded bg-gray-700 disabled:bg-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Division</label>
        <select
          name="division"
          value={formData.division.title || ""}
          //   onChange={handleChange}
          disabled={!isEditing}
          className="w-full border p-2 rounded bg-gray-700 disabled:bg-black"
        >
          {adminData.divisions.map((division: any) => {
            return (
              <option key={division.id} value={division.id}>
                {division.name}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">PI max</label>
        <input
          name="PImax"
          value={formData.PImax || ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border p-2 rounded bg-gray-700 disabled:bg-black"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Current</label>
        <Switch
          name="isCurrent"
          checked={formData.isCurrent}
          onChange={handleToggle}
          disabled={!isEditing}
          className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-green-500 data-focus:outline data-focus:outline-white"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out group-data-checked:translate-x-7"
          />
        </Switch>
      </div>

      {isEditing && (
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save
        </button>
      )}

      {status && <p className="text-sm text-gray-600">{status}</p>}
    </form>
  );
}
