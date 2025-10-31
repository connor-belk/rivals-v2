import React from "react";
import AdminDashboardCard from "./AdminDashboardCard";

export default function CurrentStandings() {
  return (
    <AdminDashboardCard>
      <p className="font-bold">Current Series Standings</p>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Vehicle</th>
            <th>PI</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </AdminDashboardCard>
  );
}
