const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const cars = require("../public/data/forza-motorsport-cars.json");
const circuits = require("../public/data/forza-circuits.json");

const seedFunction = async () => {
  const createManyCcircuits = await prisma.circuit
    .createMany({
      data: circuits.map((circuit) => ({
        name: circuit.name,
        country: circuit.country,
        continent: circuit.continent,
      })),
    })
    .catch((err) => {
      console.error(err);
    })
    .then(() => {
      console.log("Circuits created");
    });
};

seedFunction();
