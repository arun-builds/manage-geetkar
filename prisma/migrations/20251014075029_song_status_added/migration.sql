-- CreateEnum
CREATE TYPE "Status" AS ENUM ('To be Released', 'In Process', 'Released');

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'To be Released';
