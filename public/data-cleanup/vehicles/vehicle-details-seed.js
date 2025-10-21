import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const carsDetailed = fs.readFileSync(
  "./public/data-cleanup/vehicles/vehicle-details.json",
  "utf8"
);

const cars = JSON.parse(carsDetailed);

cars.forEach((car) => {
  car.Year = car.Year.toString();
  car.price = +car.price;
  car.country = car.country.toLowerCase();
  car.baseAccel = +car.baseAccel;
  car.driveTrain = car.engineLoc.toLowerCase() + car.driveTrain.toLowerCase();
  delete car.engineLoc;
});

let found = 0;
let unk = 0;
let reqCount = 0;
const unknownCars = [];

const seed = async () => {
  for (const car of cars) {
    try {
      const match = await prisma.vehicle.findFirst({
        where: {
          year: car.Year,
          model: car.Model,
        },
      });
      reqCount++;
      if (match) {
        found++;
        console.log("Match found:", match.id);
        await prisma.vehicle.update({
          where: { id: match.id },
          data: {
            available: car.available,
            baseAccel: car.baseAccel,
            baseBrake: car.baseBrake,
            baseHandling: car.baseHandling,
            basePI: car.basePI,
            baseSpeed: car.baseSpeed,
            country: car.country,
            driveTrain: car.driveTrain,
            price: car.price,
          },
        });
        reqCount++;
      } else {
        unk++;
        unknownCars.push(car);
        console.log("No match found");
      }
    } catch (err) {
      console.error("Error checking for car:", car, err);
      unk++;
      unknownCars.push(car);
    }
  }

  console.log("Found:", found);
  console.log("Unknown:", unk);
  fs.writeFileSync(
    "seedOutput.json",
    JSON.stringify(unknownCars, null, 2),
    "utf8"
  );

  await prisma.$disconnect();
};

const startTime = Date.now();
seed();
const duration = (Date.now() - startTime) / 1000;
console.log(`Seeding took ${duration} seconds`);
