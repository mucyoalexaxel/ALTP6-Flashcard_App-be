-- CreateTable
CREATE TABLE "user" (
    "userId" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "loggedInUser" (
    "userId" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "accessToken" VARCHAR(500) NOT NULL,
    "refreshToken" VARCHAR(500) NOT NULL,

    PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "flashCard" (
    "flashCardId" SERIAL NOT NULL,
    "question" VARCHAR(255) NOT NULL,
    "answer" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("flashCardId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");

-- AddForeignKey
ALTER TABLE "flashCard" ADD FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
