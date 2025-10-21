import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const vehicleDivisions = await prisma.vehicle.findMany({
    where: {
      DivisionId: null,
    },
    select: {
      //   id: true,
      category: true,
    },
  });
  return vehicleDivisions;
};

const vehicleDivisionsDB = await main();

const divisions = [
  ...new Set(vehicleDivisionsDB.map((vehicle) => vehicle.category)),
];

const divisionsSeed = await prisma.division.createMany({
  data: divisions.map((division) => ({
    name: division,
  })),
});

console.log(divisionsSeed);
