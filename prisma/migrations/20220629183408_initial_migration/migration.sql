-- AlterTable
ALTER TABLE "loggedInUser" ALTER COLUMN "userId" DROP DEFAULT;
DROP SEQUENCE "loggedInUser_userId_seq";
