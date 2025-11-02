"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DriverForm({ driver }: { driver: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(driver);
  const [status, setStatus] = useState("");
  const router = useRouter();

  const adminData = JSON.parse(localStorage.getItem("adminData") || "{}");
  const drivers = adminData.drivers;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving...");

    const res = await fetch(`/api/drivers/`, {
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
    const res = await fetch(`/api/drivers/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(driver.id),
    });

    if (res.ok) {
      const deletedId = await res.json();
      const remainingDrivers = drivers.filter((d: any) => d.id !== deletedId);
      localStorage.setItem(
        "adminData",
        JSON.stringify({ ...adminData, drivers: remainingDrivers })
      );
      setStatus("Deleted!");
      setIsEditing(false);
      setTimeout(() => {
        router.push("/admin/drivers");
      }, 1000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg max-w-96 mx-auto mt-5"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">
          {driver.firstName}'s Driver Details
        </h2>
        <button
          type="button"
          onClick={() => handleDelete(driver)}
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
        <label className="block text-sm font-medium">First Name</label>
        <input
          name="firstName"
          value={formData.firstName || ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border p-2 rounded bg-gray-700 disabled:bg-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Last Name</label>
        <input
          name="lastName"
          value={formData.lastName || ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border p-2 rounded bg-gray-700 disabled:bg-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Gamertag</label>
        <input
          name="gamertag"
          value={formData.gamertag || ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border p-2 rounded bg-gray-700 disabled:bg-black"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Number</label>
        <input
          type="number"
          name="number"
          value={formData.number || ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border p-2 rounded bg-gray-700 disabled:bg-black"
        />
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
