"use client";

import Loader from "@/components/Loader";
import React, { useEffect, useState } from "react";

interface AdminData {
  children: React.ReactNode;
  divisions: any[];
  circuits: any[];
}

export default function AdminClient({
  children,
  divisions,
  circuits,
}: AdminData) {
  const [cachedData, setCachedData] = useState<AdminData | null>(null);

  // ✅ Save server-fetched data to localStorage
  useEffect(() => {
    localStorage.setItem("adminData", JSON.stringify({ divisions, circuits }));
    localStorage.setItem("adminDataTimestamp", String(Date.now()));
  }, [divisions, circuits]);

  // ✅ Access cached data only inside the client
  useEffect(() => {
    const cached = localStorage.getItem("adminData");
    if (cached) setCachedData(JSON.parse(cached));
  }, []);

  if (!cachedData) return <Loader />;

  return (
    <>
      <div className="hidden">
        <h1>Admin Dashboard</h1>
        {/* <p> with cached data pulled from the localStorage.division.length and localStorage.circuits.length  */}
        <p>Cached {cachedData.divisions.length} divisions</p>
        <p>Cached {cachedData.circuits.length} divisions</p>
      </div>
      {children}
    </>
  );
}
