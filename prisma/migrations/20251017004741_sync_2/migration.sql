/*
  Warnings:

  - You are about to drop the column `divisionId` on the `Vehicle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Vehicle" DROP CONSTRAINT "Vehicle_divisionId_fkey";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "divisionId",
ADD COLUMN     "DivisionId" TEXT;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_DivisionId_fkey" FOREIGN KEY ("DivisionId") REFERENCES "Division"("id") ON DELETE SET NULL ON UPDATE CASCADE;
