/*
  Warnings:

  - You are about to drop the column `category` on the `Vehicle` table. All the data in the column will be lost.
  - Made the column `divisionId` on table `Series` required. This step will fail if there are existing NULL values in that column.
  - Made the column `DivisionId` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Series" DROP CONSTRAINT "Series_divisionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Vehicle" DROP CONSTRAINT "Vehicle_DivisionId_fkey";

-- AlterTable
ALTER TABLE "Series" ALTER COLUMN "divisionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "category",
ADD COLUMN     "available" TEXT,
ADD COLUMN     "baseAccel" DOUBLE PRECISION,
ADD COLUMN     "baseBrake" DOUBLE PRECISION,
ADD COLUMN     "baseHandling" DOUBLE PRECISION,
ADD COLUMN     "basePI" INTEGER,
ADD COLUMN     "baseSpeed" DOUBLE PRECISION,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "driveTrain" TEXT,
ADD COLUMN     "engineLoc" TEXT,
ADD COLUMN     "price" INTEGER,
ALTER COLUMN "DivisionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_DivisionId_fkey" FOREIGN KEY ("DivisionId") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
