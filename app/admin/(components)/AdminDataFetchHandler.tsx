"use client";

import Loader from "@/components/Loader";
import React, { useEffect, useState } from "react";

interface AdminData {
  divisions: any[];
  circuits: any[];
  vehicles: any[];
}

export default function AdminClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cachedData, setCachedData] = useState<AdminData | null>(null);

  const fetchAdminData = async () => {
    const fetchData = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/data`
    );
    const adminData = await fetchData.json();
    console.log("fetched data from database");
    return adminData;
  };

  useEffect(() => {
    let adminData = localStorage.getItem("adminData");
    let adminDataTimeStamp = localStorage.getItem("adminDataTimeStamp");
    const oneDay = 1000 * 60 * 60 * 24;
    console.log(
      "Current age of cached data: ",
      Date.now() - parseInt(adminDataTimeStamp!)
    );
    if (
      adminData &&
      adminDataTimeStamp &&
      Date.now() - parseInt(adminDataTimeStamp) < oneDay
    ) {
      console.log("found cached data");

      setCachedData(JSON.parse(adminData));
      console.log("cached data found and set");
      return;
    } else console.log("no cached data found");
    console.log("fetching data from database...");
    fetchAdminData().then((data) => {
      localStorage.setItem("adminData", JSON.stringify(data));
      localStorage.setItem("adminDataTimeStamp", Date.now().toString());
      setCachedData(data);
    });
  }, []);

  if (!cachedData) return <Loader />;

  return (
    <>
      <div className="hidden">
        <h1>Admin Dashboard</h1>
        {/* <p> with cached data pulled from the localStorage.division.length and localStorage.circuits.length  */}
        <p>Cached {cachedData.divisions.length} divisions</p>
        <p>Cached {cachedData.circuits.length} circuits</p>
        <p>Cached {cachedData.vehicles.length} vehicles</p>
      </div>
      {children}
    </>
  );
}
