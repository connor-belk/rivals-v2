import DriverTable from "./(components)/DriverTable";

export default function DriversPage() {
  return (
    <>
      <div>
        <h2>Current Drivers</h2>
        <p>A list of all drivers and relevant information about them.</p>
      </div>
      <DriverTable />
    </>
  );
}
