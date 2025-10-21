-- DropForeignKey
ALTER TABLE "public"."Series" DROP CONSTRAINT "Series_divisionId_fkey";

-- AlterTable
ALTER TABLE "Circuit" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Division" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Driver" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Layout" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Race" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "RaceResult" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Series" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "divisionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "divisionId" TEXT,
ALTER COLUMN "id" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE SET NULL ON UPDATE CASCADE;
