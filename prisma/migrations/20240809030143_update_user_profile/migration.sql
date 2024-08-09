/*
  Warnings:

  - You are about to alter the column `fullName` on the `UserProfile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `address1` on the `UserProfile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `address2` on the `UserProfile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `city` on the `UserProfile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `state` on the `UserProfile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(2)`.
  - You are about to alter the column `zipCode` on the `UserProfile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(9)`.

*/
-- DropForeignKey
ALTER TABLE "VolunteerHistory" DROP CONSTRAINT "VolunteerHistory_eventId_fkey";

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "fullName" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "address1" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "address2" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "city" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "state" SET DATA TYPE CHAR(2),
ALTER COLUMN "zipCode" SET DATA TYPE VARCHAR(9);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" SERIAL NOT NULL,
    "volunteerId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "States" (
    "code" CHAR(2) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "States_pkey" PRIMARY KEY ("code")
);
