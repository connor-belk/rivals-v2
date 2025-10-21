const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const main = async (circuitId) => {
  const circuit = await prisma.circuit.findUnique({
    where: {
      id: circuitId,
    },
    include: {
      layout: true, // use select: { id: true ...} to include only vertain fields of the related table.
    },
  });
  console.log(circuit);
};

main("9edf39a0-7b0c-4d40-b8d4-128fedada491");
