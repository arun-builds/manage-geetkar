-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('member', 'admin');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'member';
