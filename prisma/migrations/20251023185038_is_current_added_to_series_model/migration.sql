-- AlterTable
ALTER TABLE "Driver" ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "number" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "isCurrent" BOOLEAN NOT NULL DEFAULT false;
