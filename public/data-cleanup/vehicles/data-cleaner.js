// FORMATTING
/* 
    OLD FORMAT
    {
    "Vehicle": "2017 Abarth 124 Spider",
    "Category": "Modern Sport Compact",
    "Availability": "Showroom All",
    "Released": "Update 4"
    },

    NEW FORMAT
    {
    Year: "2017",
    Make: "Abarth",
    Model: "124 Spider",
    Category: "Modern Sport Compact",
    Released: "Update 4",
    },
*/

const fs = require("fs");
const path = require("path");

const cars = require("./forza-cars-list.json");
const manufacturers = require("./make-list.json");

const updatedCars = cars.map((car) => {
  // 1. Grab the year
  const year = car.Vehicle.slice(0, 4);

  // 2. Remove the year and leading space
  const rest = car.Vehicle.slice(5);

  // 3. Find the manufacturer that matches the start of 'rest'
  let make = "";
  let model = rest;

  for (let m of manufacturers) {
    if (rest.startsWith(m)) {
      make = m;
      model = rest.slice(m.length).trim(); // remove make and leading space
      break;
    }
  }

  return {
    Year: year,
    Make: make,
    Model: model,
    Category: car.Category,
    Released: car.Released,
  };
});

console.log(updatedCars[-1]);

fs.writeFileSync(
  "forza-motorsport-cars.json",
  JSON.stringify(updatedCars, null, 2)
);

console.log("File saved!");
