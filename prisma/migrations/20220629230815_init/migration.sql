/*
  Warnings:

  - The primary key for the `loggedInUser` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "loggedInUser" DROP CONSTRAINT "loggedInUser_pkey",
ADD COLUMN     "sessionId" SERIAL NOT NULL,
ADD PRIMARY KEY ("sessionId");
