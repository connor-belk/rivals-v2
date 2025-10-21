/*
  Warnings:

  - You are about to drop the column `division` on the `Series` table. All the data in the column will be lost.
  - Added the required column `divisionId` to the `Series` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Series" DROP COLUMN "division",
ADD COLUMN     "divisionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Division" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Division_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
