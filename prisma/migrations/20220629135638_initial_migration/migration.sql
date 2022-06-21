/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `loggedInUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "loggedInUser" DROP COLUMN "refreshToken";
