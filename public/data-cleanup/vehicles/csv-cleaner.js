import fs from "fs";

// Read the CSV
const vehicles = fs.readFileSync(
  "./public/data-cleanup/vehicles/cleanedVehicles.json",
  "utf8"
);

// Parse the JSON
const vehiclesJSON = JSON.parse(vehicles);
let titles = [];
let fixed = 0;
let clean = 0;
let unknown = 0;

const cleaned = [];

for (let vehicle of vehiclesJSON) {
  if (vehicle.year.startsWith("<!--")) {
    titles.push(vehicle);
  } else if (vehicle.country.length > 3) {
    vehicle.makemodel = vehicle.country;
    vehicle.country = vehicle.drivetrain;
    vehicle.drivetrain = vehicle.basePI;
    vehicle.basePI = vehicle.baseSpeed;
    vehicle.baseSpeed = vehicle.baseBrake;
    vehicle.baseBrake = vehicle.baseHandling;
    vehicle.baseHandling = vehicle.baseAccel;
    vehicle.baseAccel = vehicle.price;
    vehicle.price = vehicle.FIELD11;
    vehicle.FIELD11 = "";

    fixed++;
  } else if (vehicle.FIELD11 === "") {
    clean++;
  } else {
    unknown++;
  }
}

console.log(titles);

// fs.writeFileSync("cleaned.csv", cleaned.join("\n"), "utf8");
// console.log("✅ Cleaned CSV saved as cleaned.csv");
