import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const divisions = await prisma.division.findMany({
  select: {
    id: true,
    name: true,
  },
});

for (const division of divisions) {
  await prisma.vehicle.updateMany({
    where: {
      category: division.name,
    },
    data: {
      DivisionId: division.id,
    },
  });
  console.log(`Updated ${division.name} vehicles.`);
}

console.log("Done.");
