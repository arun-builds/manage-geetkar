/*
  Warnings:

  - You are about to drop the column `isSignedUp` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "isSignedUp";

-- CreateTable
CREATE TABLE "AuthorizedEmails" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "isSignedUp" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AuthorizedEmails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthorizedEmails_email_key" ON "AuthorizedEmails"("email");
