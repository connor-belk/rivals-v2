"use client";
import Link from "next/link";

export default function DriverTable() {
  const driverData = localStorage.getItem("adminData");
  const drivers = JSON.parse(driverData!).drivers;

  const handleDriverDelete = async (driver: any) => {
    const confirmed = confirm(
      `Are you sure you want to delete the ${driver.firstName} driver record?`
    );
    if (!confirmed) return;
    const response = await fetch(`/api/drivers`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gamertag</th>
            <th>Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver: any) => (
            <tr key={driver.id}>
              <td>{driver.firstName}</td>
              <td>{driver.lastName}</td>
              <td>{driver.gamertag}</td>
              <td>{driver.number}</td>
              <td>
                <Link href={`/admin/drivers/${driver.id}`}>
                  <button className="hover:cursor-pointer px-2 bg-yellow-400 text-black rounded-full">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDriverDelete(driver)}
                  className="hover:cursor-pointer px-2 bg-red-500 text-white rounded-full"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
