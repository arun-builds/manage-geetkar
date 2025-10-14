/*
  Warnings:

  - You are about to drop the column `total` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Song` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "total";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "total";
