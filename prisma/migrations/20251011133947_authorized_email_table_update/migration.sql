/*
  Warnings:

  - You are about to drop the column `isSignedUp` on the `AuthorizedEmails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AuthorizedEmails" DROP COLUMN "isSignedUp";
